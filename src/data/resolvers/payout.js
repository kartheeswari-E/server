import { gql } from "apollo-server-express";
import Stripe from "stripe";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

import Reservation from "../models/reservation.js";
import Credential from "../models/credential.js";
import GlobalSetting from "../models/global_setting.js";

// Utilities
import { reFund, calculateHostPenalty, getEarliestDate, getPayoutStatus } from "../../utils/payout_services.js";
import Transaction from "../models/transaction.js";
import User from "../models/user.js";
import PayoutMethod from "../models/payout_methods.js";
import emailManagementResolver from "./email_management.js";
import moment from "moment";
import Space from "../models/space.js";

dayjs.extend(utc);

export const payoutTypeDef = gql`
	type Query {
		getPayout(reservationId: Int!): [Payout]
		getPayoutByUser(userId: Int!): [Payout]
		getPayoutForAdmin: [Payout]
	}
	type Mutation {
		payoutTransfer(transferTo: String!, reservationId: Int!): String
	}
`;

const payoutResolver = {
	Query: {
		// Fetch payout for a single reservation
		getPayout: async (_, { reservationId }) => {
			const globalSettings = await GlobalSetting.findOne();
			const reservation = await Reservation.findOne({ id: reservationId });

			if (!reservation) throw new Error("Reservation not found");
			if (["pending", "pre_accepted", "declined", "expired"].includes(reservation.status)) throw new Error("Invalid reservation state");

			let guestPayout, hostPayout;

			// Apply cancellation policy only if the status is 'cancelled'
			if (reservation.status === "cancelled") {
				// Guest payout
				guestPayout = {
					...reservation.toObject(),
					userType: "Guest",
					amount: reservation.refund.amount > 0 ? reservation.refund.amount : 0,
					payoutStatus: getPayoutStatus(reservation, globalSettings),
				};

				// Host payout
				hostPayout = {
					...reservation.toObject(),
					userType: "Host",
					amount: reservation.payout.amount > 0 ? reservation.payout.amount : 0,
					penalty: reservation.penalty?.amount || 0,
					payoutStatus: getPayoutStatus(reservation, globalSettings),
				};
			} else {
				// For non-cancelled reservations, no cancellation policy is applied
				guestPayout = {
					...reservation.toObject(),
					userType: "Guest",
					amount: 0, // No refund for guests
					payoutStatus: "not_applicable",
				};

				hostPayout = {
					...reservation.toObject(),
					userType: "Host",
					amount: reservation.total - (reservation.serviceFee || 0) - (reservation.vendorFee || 0), // Full payout to host
					penalty: 0,
					payoutStatus: getPayoutStatus(reservation, globalSettings),
				};
			}

			return [guestPayout, hostPayout];
		},

		// Fetch payouts by user
		getPayoutByUser: async (_, { userId }) => {
			const reservations = await Reservation.find({ hostId: userId });

			return reservations.map((reservation) => {
				if (reservation.status === "cancelled") {
					return {
						...reservation.toObject(),
						userType: "Host",
						amount: reservation.payout.amount > 0 ? reservation.payout.amount : 0,
						penalty: reservation.penalty?.amount || 0,
						payoutStatus: reservation.payout?.status || "future",
					};
				} else {
					return {
						...reservation.toObject(),
						userType: "Host",
						amount: reservation.total - (reservation.serviceFee || 0) - (reservation.vendorFee || 0), // Full payout
						penalty: 0,
						payoutStatus: "not_applicable",
					};
				}
			});
		},

		// Fetch all payouts for admin
		getPayoutForAdmin: async () => {
			const globalSettings = await GlobalSetting.findOne();
			const reservations = await Reservation.find({ status: { $nin: ["pending", "pre_accepted", "declined", "expired"] } })
				.populate("userDetails", "firstName image")
				.populate("hostDetails", "firstName phoneNumber email image")
				.populate("spaceDetails", "spaceAddress spaceRules spacePhotos name");

			return reservations.flatMap((reservation) => {
				if (reservation.status === "cancelled") {
					const guestPayout = {
						...reservation.toObject(),
						userType: "Guest",
						user: reservation.userDetails?.firstName,
						space: reservation.spaceDetails?.name,
						amount: reservation.refund.amount > 0 ? reservation.refund.amount : 0,
						payoutStatus: reservation.refund?.status || "future",
					};

					const hostPayout = {
						...reservation.toObject(),
						userType: "Host",
						user: reservation.hostDetails?.firstName,
						space: reservation.spaceDetails?.name,
						amount: reservation.payout.amount > 0 ? reservation.payout.amount : 0,
						penalty: reservation.penalty?.amount || 0,
						payoutStatus: getPayoutStatus(reservation, globalSettings),
					};

					return [guestPayout, hostPayout];
				} else {
					const hostPayout = {
						...reservation.toObject(),
						userType: "Host",
						user: reservation.hostDetails?.firstName,
						space: reservation.spaceDetails?.name,
						amount: reservation.total - (reservation.serviceFee || 0) - (reservation.vendorFee || 0), // Full payout to host
						penalty: 0,
						payoutStatus: getPayoutStatus(reservation, globalSettings),
					};

					return [hostPayout];
				}
			});
		},
	},

	Mutation: {
		// Process payouts for guest or host
		payoutTransfer: async (_, { transferTo, reservationId }) => {
			const credentials = await Credential.findOne();
			const stripe = new Stripe(credentials.stripe.secretKey, { apiVersion: credentials.stripe.apiVersion });

			const reservation = await Reservation.findOne({ id: reservationId });
			const space = await Space.findOne({ id: reservation.spaceId });
			if (!reservation) throw new Error("Reservation not found");

			if (transferTo === "Guest") {
				await reFund(reservation);
				return "Refund processed successfully";
			} else if (transferTo === "Host") {
				const host = await User.findOne({ id: reservation.hostId });
				let penalty = 0;

				if (reservation.cancelledBy === "Host") {
					penalty = await calculateHostPenalty(reservation.hostId, getEarliestDate(reservation.reserveData));
				}

				const finalAmount = Math.round(parseFloat(reservation.payout.amount) - penalty);

				const payoutMethod = await PayoutMethod.findOne({ userId: host.id, isDefault: true });

				if (!payoutMethod) throw new Error("No default payout method found");

				const transfer = await stripe.transfers.create({
					amount: finalAmount * 100,
					currency: "usd",
					destination: payoutMethod.payoutId,
				});

				if (transfer.id) {
					reservation.payout = {
						...reservation.payout,
						status: "completed",
						transactionId: transfer.id,
					};
					reservation.penalty = { amount: penalty }; // Save penalty details

					const transaction = new Transaction({
						userId: reservation.hostId,
						type: "payout",
						transactionId: transfer.id,
						status: "completed",
						reservationId: reservation.id,
						paymentMethod: "stripe",
						description: "",
						currencyCode: reservation.currencyCode,
						amount: finalAmount,
					});
					await transaction.save();
					await reservation.save();

					const emailContent = {
						templateId: 23,
						data: {
							name: host.firstName,
							amount: `$${finalAmount}`,
							date: moment().format("DD/MM/YYYY"),
							detail: space.name.get("en"),
						},
						subject: "Payout sent to your Account from Hyra Space",
						recipient: host.email,
					};
					const sendEmail = await emailManagementResolver.Mutation.sendEmailTemplate(null, emailContent);
					return `Payout successful. Penalty applied: $${penalty.toFixed(2)}`;
				} else {
					throw new Error("Failed to process payout");
				}
			} else {
				throw new Error("Invalid transfer type");
			}
		},
	},
};

export default payoutResolver;
