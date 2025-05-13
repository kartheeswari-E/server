import { gql } from "apollo-server-express";
import nodemailer from "nodemailer";
import Stripe from "stripe";
import Credential from "../models/credential.js";
import Space from "../models/space.js";
import Reservation from "../models/reservation.js";
import dayjs from "dayjs";
import Transaction from "../models/transaction.js";
import User from "../models/user.js";
import moment from "moment";
import emailManagementResolver from "./email_management.js";

export const otherTypeDef = gql`
	type Query {
		getReportData(fromDate: DateTime, toDate: DateTime, category: String!): ReportResponse
	}
	type Mutation {
		createPaymentIntent(currencyCode: String, amount: Float, description: String): PaymentIntentResponse
		savePaymentMethod(paymentMethodId: String!): Boolean
		removePaymentMethod(paymentMethodId: String!): Boolean
		sendEmail(htmlContent: String!, email: String!, subject: String!): EmailResponse
		sendOtp(email: String!): ResponseSendOtp
		verifyOtp(email: String!, otp: String!): Response
		updatePassword(email: String!, newPassword: String!): Response
		sendOtpVendor(email: String!): ResponseSendOtp
		verifyOtpVendor(email: String!, otp: String!): Response
		updatePasswordVendor(email: String!, newPassword: String!): Response
	}
`;

const otherQueryDef = {
	getReportData: async (_, { fromDate, toDate, category }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}

		if (!["spaces", "reservations", "transactions", "users", "deleted_users"].includes(category)) {
			throw new Error(`Invalid category specified: ${category}. Valid options are "spaces" or "reservations".`);
		}

		let transaction, space, reservation, user, text;
		let matchCondition = {};

		if (fromDate && toDate) {
			const startDate = dayjs(fromDate).startOf("day").toDate();
			const endDate = dayjs(toDate).endOf("day").toDate();
			matchCondition.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
		} else if (fromDate) {
			const startDate = dayjs(fromDate).startOf("day").toDate();
			matchCondition.createdAt = { $gte: new Date(startDate) };
		} else if (toDate) {
			const endDate = dayjs(toDate).endOf("day").toDate();
			matchCondition.createdAt = { $lt: new Date(endDate) };
		}

		if (category === "spaces") {
			const spaces = await Space.aggregate([
				{ $match: matchCondition },
				{ $lookup: { from: "space_types", localField: "spaceType", foreignField: "id", as: "SpaceTypeDetails" } },
				{ $unwind: "$SpaceTypeDetails" },
				{
					$lookup: {
						from: "users",
						localField: "userId",
						foreignField: "id",
						as: "userName",
					},
				},
				{
					$unwind: {
						path: "$userName",
					},
				},
				{
					$project: {
						id: "$id", // Match the schema's id field
						name: "$name", // Match the schema's spaceName field
						userName: "$userName.firstName",
						spaceTypeName: "$SpaceTypeDetails.name", // Match the schema's spaceTypeName field
						status: "$status", // Match the schema's spaceStatus field
						adminStatus: "$adminStatus",
						createdAt: { $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
					},
				},
			]);
			space = spaces;
			text =
				fromDate && toDate
					? `Space Reports from ${dayjs(fromDate).format("DD/MM/YYYY")} to ${dayjs(toDate).format("DD/MM/YYYY")}`
					: "Space Reports";
		} else if (category === "reservations") {
			const reservations = await Reservation.aggregate([
				{ $match: matchCondition },
				{ $lookup: { from: "users", localField: "userId", foreignField: "id", as: "userDetails" } },
				{ $lookup: { from: "users", localField: "hostId", foreignField: "id", as: "hostDetails" } },
				{ $lookup: { from: "spaces", localField: "spaceId", foreignField: "id", as: "spaceDetails" } },
				{ $unwind: "$userDetails" },
				{ $unwind: "$hostDetails" },
				{ $unwind: "$spaceDetails" },
				{
					$project: {
						id: "$id",
						spaceName: "$spaceDetails.name",
						guestName: "$userDetails.firstName",
						hostName: "$hostDetails.firstName",
						total: "$total",
						status: "$status",
						bookedAt: { $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
					},
				},
			]);

			reservation = reservations;
			text =
				fromDate && toDate
					? `Reservations Reports from ${dayjs(fromDate).format("DD/MM/YYYY")} to ${dayjs(toDate).format("DD/MM/YYYY")}`
					: "Reservation Reports";
		} else if (category === "transactions") {
			const transactions = await Transaction.aggregate([
				{ $match: matchCondition },
				{ $lookup: { from: "users", localField: "userId", foreignField: "id", as: "userDetails" } },

				{ $unwind: "$userDetails" },

				{
					$project: {
						id: "$id",
						guestName: "$userDetails.firstName",
						type: "$type",
						paymentMethod: "$paymentMethod",
						transactionId: "$transactionId",
						amount: "$amount",
						createdAt: { $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
					},
				},
			]);

			transaction = transactions;
			text =
				fromDate && toDate
					? `Transaction Reports from ${dayjs(fromDate).format("DD/MM/YYYY")} to ${dayjs(toDate).format("DD/MM/YYYY")}`
					: "Transaction Reports";
		} else if (category === "users") {
			const users = await User.aggregate([
				{ $match: { ...matchCondition, deletedAt: null } },

				{
					$project: {
						id: "$id",
						firstName: "$firstName",
						lastName: "$lastName",
						email: "$email",
						status: "$status",
						createdAt: { $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
					},
				},
			]);

			user = users;

			text =
				fromDate && toDate
					? `User Reports from ${dayjs(fromDate).format("DD/MM/YYYY")} to ${dayjs(toDate).format("DD/MM/YYYY")}`
					: "User Reports";
		} else if (category === "deleted_users") {
			const users = await User.aggregate([
				{
					$match: {
						...matchCondition,
						deletedAt: { $ne: null }, // Add this line to filter for deleted users
					},
				},

				{
					$project: {
						id: "$id",
						firstName: "$firstName",
						lastName: "$lastName",
						email: "$deletedData",
						status: "$status",
						createdAt: { $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
					},
				},
			]);

			user = users;

			text =
				fromDate && toDate
					? `Deleted User Reports from ${dayjs(fromDate).format("DD/MM/YYYY")} to ${dayjs(toDate).format("DD/MM/YYYY")}`
					: "Deleted User Reports";
		}

		return {
			spaces: space,
			reservations: reservation,
			transactions: transaction,
			users: user,
			filter_text: text,
		};
	},
};

const otherMutationDef = {
	createPaymentIntent: async (_, { currencyCode, amount, description }, { user }) => {
		const credentials = await Credential.findOne();
		try {
			const stripe = new Stripe(credentials.stripe.secretKey, { apiVersion: credentials.stripe.apiVersion });

			// Ensure the user is authenticated
			let customer;
			const userRecord = await User.findOne({ id: user.userId });
			if (userRecord.stripeCustomerId) {
				customer = userRecord.stripeCustomerId;
			}

			const totalAmount = parseFloat(amount);
			const paymentIntent = await stripe.paymentIntents.create({
				amount: parseInt(totalAmount * 100),
				currency: currencyCode ? currencyCode?.toLowerCase() : "usd",
				description: description,
				customer: customer,
				automatic_payment_methods: {
					enabled: true,
				},
			});
			return { status: true, clientSecret: paymentIntent.client_secret };
		} catch (error) {
			throw new Error("Failed to create payment intent");
		}
	},
	savePaymentMethod: async (_, { paymentMethodId }, { user }) => {
		if (!user) {
			throw new Error("User is not authenticated.");
		}

		try {
			// Retrieve Stripe credentials
			const credentials = await Credential.findOne();
			const stripe = new Stripe(credentials.stripe.secretKey, {
				apiVersion: credentials.stripe.apiVersion,
			});

			// Check or create Stripe customer
			let userRecord = await User.findOne({ id: user.userId });
			if (!userRecord.stripeCustomerId) {
				const customer = await stripe.customers.create({
					email: userRecord.email,
					name: `${userRecord.firstName} ${userRecord.lastName}`,
				});
				userRecord.stripeCustomerId = customer.id;
				await userRecord.save();
			}

			// Attach the PaymentMethod to the Stripe customer
			await stripe.paymentMethods.attach(paymentMethodId, {
				customer: userRecord.stripeCustomerId,
			});

			// Retrieve PaymentMethod details
			const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
			const { brand, last4, exp_month, exp_year } = paymentMethod.card;

			// Check for duplicates
			const existingCard = userRecord.paymentMethods.find((card) => card.last4 === last4 && card.brand === brand);
			if (existingCard) {
				throw new Error("This card is already saved.");
			}

			// Save card details in the database
			userRecord.paymentMethods.push({
				paymentMethodId,
				brand,
				last4,
				expMonth: exp_month,
				expYear: exp_year,
			});
			await userRecord.save();

			const emailContent = {
				templateId: 5,
				data: {
					brand: brand,
					last4: last4,
					user: userRecord.firstName,
					location: "",
					device: "",
					date: moment().format("DD/MM/YYYY hh:mm A"),
				},
				subject: "A payment method was added to your account",
				recipient: userRecord.email,
			};
			const sendEmail = await emailManagementResolver.Mutation.sendEmailTemplate(_, emailContent);

			return true;
		} catch (error) {
			throw new Error(error.message || "Failed to save payment method.");
		}
	},
	removePaymentMethod: async (_, { paymentMethodId }, { user }) => {
		if (!user) {
			throw new Error("User  is not authenticated.");
		}

		try {
			// Retrieve Stripe credentials
			const credentials = await Credential.findOne();
			const stripe = new Stripe(credentials.stripe.secretKey, {
				apiVersion: credentials.stripe.apiVersion,
			});

			// Retrieve the user record
			const userRecord = await User.findOne({ id: user.userId });
			if (!userRecord) {
				throw new Error("User  not found.");
			}

			// Detach the PaymentMethod from the Stripe customer
			await stripe.paymentMethods.detach(paymentMethodId);

			// Remove the payment method from the user's local record
			userRecord.paymentMethods = userRecord.paymentMethods.filter((card) => card.paymentMethodId !== paymentMethodId);
			await userRecord.save();

			return true;
		} catch (error) {
			throw new Error(error.message || "Failed to remove payment method.");
		}
	},
	sendEmail: async (_, { htmlContent, email, subject }) => {
		try {
			const credentials = await Credential.findOne();
			let transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: process.env.MAIL,
					pass: process.env.MAIL_PASSWORD,
				},
			});

			let mailOptions = {
				from: process.env.MAIL,
				to: email,
				subject: subject,
				html: htmlContent,
			};

			let info = await transporter.sendMail(mailOptions);

			return { success: true, message: "Email sent successfully" };
		} catch (error) {
			return { success: false, message: "Error sending email" };
		}
	},
};

const otherResolver = {
	Query: otherQueryDef,
	Mutation: otherMutationDef,
};

export default otherResolver;
