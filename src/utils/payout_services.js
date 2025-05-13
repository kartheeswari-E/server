import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import Stripe from "stripe";
import Credential from "../data/models/credential.js";
import Transaction from "../data/models/transaction.js";
import Reservation from "../data/models/reservation.js";
import timezone from "dayjs/plugin/timezone.js";
import User from "../data/models/user.js";
import emailManagementResolver from "../data/resolvers/email_management.js";
import moment from "moment";
import Space from "../data/models/space.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const timezoneName = "Asia/Kolkata"; // Replace with your local time zone

export async function reFund(reservation) {
	const credentials = await Credential.findOne();
	const user = await User.findOne({ id: reservation.userId });
	const stripe = new Stripe(credentials.stripe.secretKey, { apiVersion: credentials.stripe.apiVersion });
	const space = await Space.findOne({ id: reservation.spaceId });
	const paymentIntent = await stripe.paymentIntents.retrieve(reservation.transactionId);
	if (!paymentIntent.latest_charge) throw new Error(`No charges found for payment intent ${reservation.transactionId}`);

	const refund = await stripe.refunds.create({
		charge: paymentIntent.latest_charge,
		amount: Math.round(reservation.refund.amount * 100),
	});

	reservation.refund = {
		...reservation.refund,
		status: "completed",
		transactionId: refund.id,
	};
	const transaction = new Transaction({
		userId: reservation.userId,
		type: "refund",
		transactionId: refund.id,
		status: "completed",
		reservationId: reservation.id,
		paymentMethod: "stripe",
		description: "",
		currencyCode: reservation.currencyCode,
		amount: reservation.refund.amount,
	});
	await transaction.save();
	await reservation.save();

	const emailContent = {
		templateId: 24,
		data: {
			name: user.firstName,
			amount: `$${parseFloat(reservation.refund.amount).toFixed(2)}`,
			date: moment().format("DD/MM/YYYY"),
			detail: space.name.get("en"),
		},
		subject: "Refund Processed to Your Account from Hyra Space",
		recipient: user.email,
	};
	const sendEmail = await emailManagementResolver.Mutation.sendEmailTemplate(null, emailContent);
}

export function hostEarning(percentage, amount) {
	const adminFee = (percentage / 100) * amount;
	return amount - adminFee;
}

export async function calculateRefundPolicy(cancelledBy, reservationId) {
	const reservation = await Reservation.findOne({ id: reservationId });
	const policyType = reservation.cancellationPolicyData;
	const cancelDate = reservation.cancelledAt;
	const checkInDate = getEarliestDate(reservation.reserveData);
	const cleaningFee = reservation.cleaningFee > 0 ? reservation.cleaningFee : 0;
	const discount = reservation.specialOfferId ? 0 : reservation?.appliedDiscount > 0 ? reservation?.appliedDiscount : 0;
	const subTotal = reservation.subTotal - discount + cleaningFee;
	const serviceFee = reservation.serviceFee;
	const hostFee = reservation.vendorFee;

	const cancelDateTime = dayjs(cancelDate).tz(timezoneName);
	const checkInDateTime = dayjs(checkInDate)
		.tz(timezoneName)
		.startOf("day")
		.add(parseInt(getEarliestReserve(reservation.reserveData).startTime.split(":")[0]), "hour")
		.add(parseInt(getEarliestReserve(reservation.reserveData).startTime.split(":")[1]), "minute");
	const reservedEndDateTime = dayjs(getEndDate(reservation.reserveData)).tz(timezoneName); // Assuming reserveData has an `endDate` field

	const hostFeePercentage = (hostFee / subTotal) * 100;

	const policies = {
		1: [
			{ days: 1, guestRefund: subTotal, hostPayout: 0 }, // Very Flexible
			{ days: 0, guestRefund: 0, hostPayout: hostEarning(hostFeePercentage, subTotal) },
		],
		2: [
			{ days: 7, guestRefund: subTotal, hostPayout: 0 }, // Flexible
			{ days: 1, guestRefund: subTotal * 0.5, hostPayout: hostEarning(hostFeePercentage, subTotal * 0.5) },
			{ days: 0, guestRefund: 0, hostPayout: hostEarning(hostFeePercentage, subTotal) },
		],
		3: [
			{ days: 30, guestRefund: subTotal, hostPayout: 0 }, // Standard 30
			{ days: 7, guestRefund: subTotal * 0.5, hostPayout: hostEarning(hostFeePercentage, subTotal * 0.5) },
			{ days: 0, guestRefund: 0, hostPayout: hostEarning(hostFeePercentage, subTotal) },
		],
		4: [
			{ days: 90, guestRefund: subTotal, hostPayout: 0 }, // Standard 90
			{ days: 14, guestRefund: subTotal * 0.5, hostPayout: hostEarning(hostFeePercentage, subTotal * 0.5) },
			{ days: 0, guestRefund: 0, hostPayout: hostEarning(hostFeePercentage, subTotal) },
		],
	};

	// Check for invalid policy type
	const policy = policies[policyType];
	if (!policy) throw new Error("Invalid cancellation policy");

	// Determine if user or host cancelled and calculate accordingly
	if (cancelledBy === "user") {
		// Case 1: User cancels before check-in date
		if (cancelDateTime.isBefore(checkInDateTime)) {
			for (const rule of policy) {
				const refundCutoffDate = checkInDateTime.subtract(rule.days, "days");
				if (cancelDateTime.isBefore(refundCutoffDate)) {
					return { guestRefund: rule.guestRefund, hostPayout: rule.hostPayout };
				}
			}
		}

		// Case 2: User cancels after the reserved date
		if (cancelDateTime.isAfter(reservedEndDateTime)) {
			return { guestRefund: 0, hostPayout: subTotal - hostFee };
		}

		// Default: Apply the last rule in the policy
		const lastRule = policy[policy.length - 1];
		return { guestRefund: lastRule.guestRefund, hostPayout: lastRule.hostPayout };
	} else if (cancelledBy === "vendor") {
		// Case 3: Host cancels before the reserved date
		if (cancelDateTime.isBefore(checkInDateTime)) {
			return { guestRefund: subTotal + serviceFee, hostPayout: 0 };
		}

		// Case 4: Host cancels after the reserved date
		if (cancelDateTime.isAfter(reservedEndDateTime)) {
			return { guestRefund: 0, hostPayout: subTotal - hostFee };
		}
	}

	// Default fallback (should never reach here if logic is complete)
	return { guestRefund: 0, hostPayout: 0 };
}

export function getEarliestDate(dates) {
	return dates.reduce((earliest, current) => (dayjs.utc(current.date).isBefore(dayjs.utc(earliest.date)) ? current : earliest)).date;
}
export function getEndDate(dates) {
	return dates.reduce((earliest, current) => (dayjs.utc(current.date).isAfter(dayjs.utc(earliest.date)) ? current : earliest)).date;
}
export function getEarliestReserve(dates) {
	return dates.reduce((earliest, current) => (dayjs.utc(current.date).isBefore(dayjs.utc(earliest.date)) ? current : earliest));
}
export function getLastReserve(dates) {
	return dates.reduce((earliest, current) => (dayjs.utc(current.date).isAfter(dayjs.utc(earliest.date)) ? current : earliest));
}

export async function calculateHostPenalty(reservation) {
	const { penalty } = reservation;

	if (!penalty?.isEnabled) {
		return 0; // No penalty if disabled
	}

	const daysBeforeCheckIn = dayjs(reservation.cancelledAt).diff(dayjs(), "days");

	if (daysBeforeCheckIn >= penalty.before) {
		return penalty.limit * 2;
	} else if (daysBeforeCheckIn <= penalty.after) {
		return penalty.limit * 3;
	}

	return penalty.limit;
}

export function getPayoutStatus(reservation, holdDays) {
	const lastDate = dayjs.utc(reservation.reserveData[0]?.date);
	const releaseDate = lastDate.add(holdDays.payoutHoldDays, "days");

	if (dayjs().isBefore(releaseDate)) {
		return "upcoming";
	}

	return reservation.payout?.transactionId ? "completed" : "future";
}
