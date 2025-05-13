import { gql } from "apollo-server-express";

import Reservation from "../models/reservation.js";
import { calculatePricing, normalizeDate } from "../../utils/reserve_service.js";
import GlobalSetting from "../models/global_setting.js";
import Currency from "../models/currency.js";
import Space from "../models/space.js";
import User from "../models/user.js";
import { calculateRefundPolicy, getEarliestDate, getEarliestReserve, getEndDate, getLastReserve } from "../../utils/payout_services.js";
import SpaceAvailability from "../models/space_availability.js";
import moment from "moment";
import emailManagementResolver from "./email_management.js";
import SpaceType from "../models/space_type.js";
import { bookingCancelled, requestDeclined, requestPreAccepted } from "../../services/email_management_service.js";

export const reservationTypeDef = gql`
	type Query {
		getReservations(filters: JSON): [Reservation]
		getReservation(id: Int): Reservation
	}
	type Mutation {
		createReservation(input: ReservationInput): Reservation
		updateReservation(id: Int, input: ReservationInput): Reservation
		cancelReservation(id: Int, input: ReservationInput): Reservation
	}
`;

const reservationQueryDef = {
	getReservations: async (_, { filters }) => {
		const reservations = await Reservation.find(filters || {})
			.populate("userDetails", "firstName image")
			.populate("hostDetails", "firstName phoneNumber email image")
			.populate("spaceDetails", "spaceAddress spaceRules spacePhotos name")
			.populate("activityDetails", "name")
			.populate("spaceTypeDetails", "name")
			.populate("reservationReviews");

		return reservations.map((reservation) => ({
			...reservation.toObject(),
			user: reservation.userDetails?.firstName,
			userImage: reservation.userDetails?.image,
			host: reservation.hostDetails?.firstName,
			hostImage: reservation.hostDetails?.image,
			hostNumber: reservation.hostDetails?.phoneNumber,
			hostEmail: reservation.hostDetails?.email,
			space: reservation.spaceDetails?.name,
			spaceImage: reservation.spaceDetails?.spacePhotos?.[0]?.image,
			spaceAddress: reservation.spaceDetails?.spaceAddress,
			spaceRules: reservation.spaceDetails?.spaceRules,
			spaceTypeName: reservation.spaceTypeDetails?.name,
			activityName: reservation.activityDetails?.name,
			hostReview: reservation.reservationReviews.find((review) => review.userType == "host"),
			userReview: reservation.reservationReviews.find((review) => review.userType == "user"),
		}));
	},

	// Get a single reservation with user, host, space, activity type, and activity details
	getReservation: async (_, { id }) => {
		const reservation = await Reservation.findOne({ id })
			.populate("userDetails", "firstName image")
			.populate("hostDetails", "firstName phoneNumber email image")
			.populate("spaceDetails", "spaceAddress spaceRules spacePhotos name")
			.populate("activityDetails", "name")
			.populate("spaceTypeDetails", "name")
			.populate("reservationReviews");

		if (!reservation) throw new Error("Reservation not found");
		const now = new Date();
		return {
			...reservation.toObject(),
			user: reservation.userDetails?.firstName,
			userImage: reservation.userDetails?.image,
			host: reservation.hostDetails?.firstName,
			hostImage: reservation.hostDetails?.image,
			hostNumber: reservation.hostDetails?.phoneNumber,
			hostEmail: reservation.hostDetails?.email,
			space: reservation.spaceDetails?.name,
			spaceImage: reservation.spaceDetails?.spacePhotos?.[0]?.image,
			spaceAddress: reservation.spaceDetails?.spaceAddress,
			spaceRules: reservation.spaceDetails?.spaceRules,
			spaceTypeName: reservation.spaceTypeDetails?.name,
			activityName: reservation.activityDetails?.name,
			hostReview: reservation.reservationReviews.find((review) => review.userType == "host"),
			userReview: reservation.reservationReviews.find((review) => review.userType == "user"),
		};
	},
};

const reservationMutationDef = {
	createReservation: async (_, { input }, context) => {
		if (!context.user) {
			throw new Error("Not authenticated");
		}
		if (context.user.type !== "user") {
			throw new Error("Not authenticated");
		}

		const user = await User.findOne({ email: context.user.email });
		if (!user) {
			throw new Error("User not found");
		}

		const data = { ...input };
		const settings = await GlobalSetting.findOne();
		const currency = await Currency.findOne({ code: settings.defaultCurrency });

		let space = await Space.findOne({ id: input.spaceId, deletedAt: null });
		if (!space) {
			throw new Error("Space not found");
		}

		const selectedActivity = space?.activity?.find((data) => data.type === input.activityType);
		const hourlyRate = selectedActivity?.pricePerHour || 0;

		// Calculate total hours based on input data
		let totalHours = 0;
		input.reserveData.forEach((entry) => {
			if (entry.date && entry.startTime && entry.endTime) {
				const [startHour, startMinute] = entry.startTime.split(":").map(Number);
				const [endHour, endMinute] = entry.endTime.split(":").map(Number);

				const startDateTime = new Date(entry.date);
				startDateTime.setHours(startHour, startMinute, 0, 0);

				const endDateTime = new Date(entry.date);
				endDateTime.setHours(endHour, endMinute, 0, 0);

				if (endDateTime > startDateTime) {
					const durationInHours = (endDateTime - startDateTime) / (1000 * 60 * 60);
					totalHours += durationInHours;
				}
			}
		});

		const baseAmount = hourlyRate * totalHours;
		const cleaningFee = selectedActivity?.cleaningFee || 0;

		const stayDiscount = selectedActivity?.stayDiscount?.find((discount) => totalHours >= parseFloat(discount.period));
		const earlyDiscountDate = new Date(input.reserveData[0].date);
		const daysUntilBooking = Math.floor((earlyDiscountDate - new Date()) / (1000 * 60 * 60 * 24));
		const earlyDiscount = selectedActivity?.earlyDiscount?.find((discount) => daysUntilBooking >= parseFloat(discount.period));

		const pricingResult = await calculatePricing({
			baseAmount,
			cleaningFee: cleaningFee,
			applyDiscount: true,
			discountInfo: {
				stayDiscount: stayDiscount ? { percentage: parseFloat(stayDiscount.percentage) } : null,
				earlyDiscount: earlyDiscount ? { percentage: parseFloat(earlyDiscount.percentage) } : null,
			},
		});

		const total = pricingResult.totalPrice + pricingResult.serviceFee + cleaningFee;

		data["spaceType"] = space.spaceType;
		data["currencyCode"] = "USD";
		data["hourlyPrice"] = hourlyRate;
		data["totalHours"] = Math.round(totalHours);
		data["securityFee"] = selectedActivity?.securityFee || 0;
		data["cleaningFee"] = cleaningFee || 0;
		data["serviceFee"] = pricingResult.serviceFee || 0;
		data["serviceFee"] = pricingResult.serviceFee || 0;
		data["subTotal"] = baseAmount || 0;
		data["discountType"] = pricingResult.discountType || 0;
		data["appliedDiscount"] = pricingResult.discountAmount || 0;
		data["vendorFee"] = pricingResult.vendorFee || 0;
		data["total"] = total;
		data["payout"] = {
			currencyCode: "USD",
			amount: pricingResult.hostPayout,
			status: "upcoming",
		};
		data["penalty"] = {
			isEnabled: settings.fee.hostPenaltyEnabled,
			limit: settings.fee.hostCancelLimit,
			days: settings.fee.penaltyDays,
			before: settings.fee.cancelBeforeDays,
			after: settings.fee.cancelAfterDays,
		};
		data["cancellationPolicyData"] = space.cancellationPolicy;

		const reservation = new Reservation(data);
		try {
			await reservation.save();
			return await reservation.save();
		} catch (e) {
			console.log("error", e);
		}
	},
	updateReservation: async (_, { id, input }, context) => {
		try {
			const reservation = await Reservation.findOne({ id });
			if (!reservation) {
				throw new Error("Reservation not found");
			}

			if (reservation.status == "pending" && input.status == "pre_accepted") {
				await requestPreAccepted(reservation.id);
			}
			if (reservation.status == "pending" && input.status == "declined") {
				await requestDeclined(reservation.id);
			}
			Object.keys(input).forEach((key) => {
				reservation[key] = input[key];
			});

			await reservation.save();

			return reservation;
		} catch (error) {
			throw new Error("Error updating reservation");
		}
	},
	cancelReservation: async (_, { id, input }, context) => {
		try {
			let reservation = await Reservation.findOne({ id });
			if (!reservation) {
				throw new Error("Reservation not found");
			}

			Object.keys(input).forEach((key) => {
				reservation[key] = input[key];
			});

			const { reserveData, id: reservationId } = reservation;
			for (const reserveEntry of reserveData) {
				const { date, startTime, endTime } = reserveEntry;

				const reserveStartTime = normalizeDate(date, startTime);
				const reserveEndTime = normalizeDate(date, endTime);

				if (isNaN(reserveStartTime) || isNaN(reserveEndTime)) {
					throw new Error(`Invalid date or time for reservation on ${date}`);
				}

				await SpaceAvailability.updateMany(
					{
						reservationId,
						reserveDate: moment(date, moment.ISO_8601, true).toISOString(), // Ensure consistent date format
					},
					{
						$set: { available: true },
					},
				);
			}
			const refund = await calculateRefundPolicy(input.cancelledBy, reservation.id);

			reservation.payout = { ...reservation.payout, amount: refund.hostPayout, status: "pending" };
			reservation.refund = { ...reservation.refund, amount: refund.guestRefund, status: "pending" };

			await bookingCancelled(reservation.id, input.cancelledBy);

			await reservation.save();
			return reservation;
		} catch (error) {
			console.log("error", error);
			throw new Error("Error updating reservation");
		}
	},
};

const reservationResolver = {
	Query: reservationQueryDef,
	Mutation: reservationMutationDef,
};

export default reservationResolver;
