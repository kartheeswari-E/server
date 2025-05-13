import { gql } from "apollo-server-express";
import Transaction from "../models/transaction.js";
import Reservation from "../models/reservation.js";
import SpaceAvailability from "../models/space_availability.js";
import { normalizeDate } from "../../utils/reserve_service.js";
import moment from "moment";
import emailManagementResolver from "./email_management.js";
import Space from "../models/space.js";
import SpaceType from "../models/space_type.js";
import { getEarliestDate, getEarliestReserve, getEndDate, getLastReserve } from "../../utils/payout_services.js";
import User from "../models/user.js";
import Admin from "../models/admin.js";
import { bookingConfirmed } from "../../services/email_management_service.js";

export const transactionTypeDef = gql`
	type Query {
		getTransactions(filters: JSON): [Transaction]
		getTransaction(id: Int): Transaction
	}
	type Mutation {
		createTransaction(input: TransactionInput): Boolean
		updateTransaction(id: Int!, input: TransactionInput): Boolean
	}
`;

const transactionQueryDef = {
	getTransactions: async (_, { filters }) => {
		const transactions = await Transaction.find(filters);
		return transactions;
	},
	getTransaction: async (_, { id }) => {
		return await Transaction.findOne({ id });
	},
};

const transactionMutationDef = {
	createTransaction: async (_, { input }) => {
		const data = { ...input };
		const transaction = new Transaction(data);

		try {
			await transaction.save();

			// Handle reservation availability if type is "reservation" and status is "completed"
			if (data.type === "reservation" && data.status === "completed") {
				const reservation = await Reservation.findOne({ id: data.reservationId });

				if (!reservation) {
					throw new Error(`Reservation with ID ${data.reservationId} not found`);
				}

				const { reserveData, spaceId, userId } = reservation;

				for (const reserveEntry of reserveData) {
					const { date, startTime, endTime } = reserveEntry;

					try {
						// Normalize date and time formats
						const reserveStartTime = normalizeDate(date, startTime);
						const reserveEndTime = normalizeDate(date, endTime);

						const durationInHours = moment.duration(moment(reserveEndTime).diff(moment(reserveStartTime))).asHours();
						if (durationInHours <= 0) {
							throw new Error(`Invalid time range: ${startTime} to ${endTime}`);
						}

						// Create space availability entry
						await SpaceAvailability.create({
							spaceId,
							userId,
							reserveDate: moment(date, moment.ISO_8601, true).toISOString(), // Ensure consistent date format
							reserveStartTime,
							reserveEndTime,
							reservationId: reservation.id,
							available: false,
						});
						await bookingConfirmed(reservation.id);
					} catch (error) {
						console.error(`Error creating availability for date ${date}:`, error);
						// Optionally: continue to next entry or halt completely
					}
				}
			}

			return true;
		} catch (e) {
			return false;
		}
	},

	updateTransaction: async (_, { id, input }) => {
		const transaction = await Transaction.findOne({ id });

		if (!transaction) {
			throw new Error("Transaction not found");
		}

		const data = { ...input };
		Object.assign(transaction, data);
		try {
			await transaction.save();
			return true;
		} catch (e) {
			return false;
		}
	},
};

const transactionResolver = {
	Query: transactionQueryDef,
	Mutation: transactionMutationDef,
};

export default transactionResolver;
