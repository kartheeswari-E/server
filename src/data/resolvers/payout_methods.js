import { gql } from "apollo-server-express";
import Stripe from "stripe";

import PayoutMethod from "../models/payout_methods.js";
import User from "../models/user.js";
import Credential from "../models/credential.js";
import userResolver from "./user.js";

export const payoutMethodTypeDef = gql`
	type Query {
		getPayoutMethod(payoutId: Int!): PayoutMethod
		listPayoutMethods: [PayoutMethod]
		getPayoutMethodsByUserId(userId: Int!): [PayoutMethod]
	}
	type Mutation {
		createPayoutMethod(
			userId: Int
			payoutId: String
			methodType: String
			methodTypeText: String
			currencyCode: String
			isDefault: Boolean
			countryCode: String
			status: Boolean
			statusText: String
		): String
		updatePayoutMethod(
			id: Int!
			payoutId: String!
			userId: Int
			methodType: String
			methodTypeText: String
			currencyCode: String
			isDefault: Boolean
			countryCode: String
			status: Boolean
			statusText: String
		): String
		updatePayoutMethodsByUserId(userId: Int!, payoutMethodId: Int!): String
		deletePayoutMethod(payoutId: Int!): Boolean
		redirectToStripeConnect(redirectUri: String!, userId: ID!): StripeConnectResponse!
		handleStripeCallback(code: String!, redirectUri: String!, userId: ID!): StripeCallbackResponse!
	}
`;

const payoutMethodQueryDef = {
	getPayoutMethod: async (_, { payoutId }) => {
		return await PayoutMethod.findOne({ id: payoutId });
	},
	listPayoutMethods: async () => {
		return await PayoutMethod.find({});
	},
	getPayoutMethodsByUserId: async (_, { userId }) => {
		let inActiveStripe = [];
		let others = [];

		const credentials = await Credential.findOne();

		const stripe = new Stripe(credentials.stripe.secretKey, { apiVersion: credentials.stripe.apiVersion });

		const payoutMethods = await PayoutMethod.find({ userId });

		const isDefaultCheck = payoutMethods.find((data) => data.isDefault);
		payoutMethods.forEach((data) => {
			if (data.methodType === "stripe" && data.status === 0) {
				inActiveStripe.push(data);
			} else {
				others.push(data);
			}
		});

		const stripeStatusPromises = inActiveStripe.map(async (data) => {
			const account = await stripe.accounts.retrieve(data.payoutId);

			const updateData = {
				status: account.payouts_enabled ? 1 : 0,
				statusText: account.payouts_enabled ? "active" : "inactive",
			};

			if (isDefaultCheck == undefined && account.payouts_enabled) {
				updateData.isDefault = true;
			}

			await PayoutMethod.findOneAndUpdate({ id: data.id }, updateData);
			return { ...data.toObject(), ...updateData };
		});

		const updatedStripeStatus = await Promise.all(stripeStatusPromises);
		return [...others, ...updatedStripeStatus];
	},
};

const payoutMethodMutationDef = {
	createPayoutMethod: async (_, { userId, payoutId, methodType, methodTypeText, currencyCode, isDefault, countryCode }) => {
		const user = await User.findOne({ id: userId });
		const payoutMethods = await PayoutMethod.find({ userId });
		const credentials = await Credential.findOne();
		const stripe = new Stripe(credentials.stripe.secretKey, { apiVersion: credentials.stripe.apiVersion });
		const statusCheck = payoutMethods.find((data) => data.status == 1);
		let newPayoutMethod = {};

		if (methodType == "stripe") {
			const account = await stripe.accounts.create({
				country: countryCode,
				type: "express",
				email: user.email,
				capabilities: {
					card_payments: {
						requested: true,
					},
					transfers: {
						requested: true,
					},
				},
			});
			const accountLink = await stripe.accountLinks.create({
				account: account.id,
				refresh_url: `${process.env.APP_URL}/account-settings/payout-methods/add`,
				return_url: `${process.env.APP_URL}/account-settings/payout-methods`,
				type: "account_onboarding",
			});

			const accountStatus = await stripe.accounts.retrieve(account.id);

			if (payoutMethods.length == 0 && accountStatus.payouts_enabled) {
				isDefault = true;
			}
			newPayoutMethod = new PayoutMethod({
				userId,
				methodType,
				methodTypeText,
				payoutId: account.id,
				currencyCode: account.default_currency,
				isDefault,
				countryCode,
				status: accountStatus.payouts_enabled ? 1 : 0,
				statusText: accountStatus.payouts_enabled ? "active" : "inactive",
			});
			await newPayoutMethod.save();

			return accountLink.url;
		}

		await newPayoutMethod.save();
		return "Created Successfully";
	},
	updatePayoutMethod: async (_, { id, payoutId, userId, methodType, methodTypeText, currencyCode, isDefault, countryCode, status, statusText }) => {
		const user = await User.findOne({ id: userId });
		const credentials = await Credential.findOne();
		const stripe = new Stripe(credentials.stripe.secretKey, { apiVersion: credentials.stripe.apiVersion });
		let updatedPayoutMethod = {};

		if (methodType == "stripe") {
			let account = payoutId ? { id: payoutId } : {};
			if (!payoutId) {
				account = await stripe.accounts.create({
					country: countryCode,
					email: user.email,
					type: "express",
					capabilities: {
						card_payments: {
							requested: true,
						},
						transfers: {
							requested: true,
						},
					},
				});
			}

			const accountLink = await stripe.accountLinks.create({
				account: account.id,
				refresh_url: `${process.env.APP_URL}/payout-methods/add`,
				return_url: `${process.env.APP_URL}/payout-methods`,
				type: "account_onboarding",
			});

			const accountStatus = await stripe.accounts.retrieve(account.id);

			updatedPayoutMethod = await PayoutMethod.findOneAndUpdate(
				{ id: id },
				{
					userId,
					payoutId: account.id,
					methodType,
					methodTypeText,
					currencyCode,
					countryCode,
					status: accountStatus.payouts_enabled ? 1 : 0,
					statusText: accountStatus.payouts_enabled ? "active" : "inactive",
				},
				{ new: true },
			);
			return accountLink.url;
		}

		return updatedPayoutMethod && "Updated Successfully";
	},
	updatePayoutMethodsByUserId: async (_, { userId, payoutMethodId }) => {
		const payoutCheck = await PayoutMethod.findOne({
			id: payoutMethodId,
		});

		const credentials = await Credential.findOne();
		const stripe = new Stripe(credentials.stripe.secretKey, { apiVersion: credentials.stripe.apiVersion });

		let accountStatus = { payouts_enabled: true };
		if (payoutCheck.methodType == "stripe") {
			const account = await stripe.accounts.retrieve(payoutCheck.payoutId);
			accountStatus = account;
		}

		if (payoutCheck?.status !== 1 && !account.payouts_enabled) {
			return "Payout method is not active";
		}
		const payoutMethods = await PayoutMethod.find({ userId });

		await Promise.all(
			payoutMethods.map(async (payoutMethod) => {
				if (payoutMethod.id !== payoutMethodId) {
					payoutMethod.isDefault = false;
					await payoutMethod.save();
				}
			}),
		);

		const payoutMethodToUpdate = await PayoutMethod.findOne({
			id: payoutMethodId,
		});

		payoutMethodToUpdate.isDefault = true;
		payoutMethodToUpdate.status = 1;
		payoutMethodToUpdate.statusText = "active";

		await payoutMethodToUpdate.save();

		return "Updated";
	},
	deletePayoutMethod: async (_, { payoutId }, context) => {
		const payoutCheck = await PayoutMethod.findOne({ id: payoutId });
		if (payoutCheck?.userId !== context.user.userId) {
			throw new Error("You are not authorized to delete this payout method");
		}
		const result = await PayoutMethod.deleteOne({ id: payoutId });
		return result.deletedCount > 0;
	},
	redirectToStripeConnect: async (_, { redirectUri, userId }) => {
		try {
			const credentials = await Credential.findOne();
			const stripe = new Stripe(credentials.stripe.secretKey, { apiVersion: credentials.stripe.apiVersion });
			new URL(redirectUri);

			const account = await stripe.accounts.create({
				country: "US",
				type: "express",
				capabilities: {
					card_payments: { requested: true },
					transfers: { requested: true },
				},
				business_type: "individual",
				business_profile: {
					url: "https://tolerant-javelin-innocent.ngrok-free.app",
				},
			});

			const accountLink = await stripe.accountLinks.create({
				account: account.id,
				refresh_url: `${redirectUri}/reauth`,
				return_url: redirectUri,
				type: "account_onboarding",
			});

			return { authUrl: accountLink.url };
		} catch (error) {
			throw new Error(`Failed to create Stripe account or generate account link. ${error.message}`);
		}
	},
	handleStripeCallback: async (_, { code, redirectUri, userId }) => {
		try {
			const credentials = await Credential.findOne();
			const stripe = new Stripe(credentials.stripe.secretKey, { apiVersion: credentials.stripe.apiVersion });
			new URL(redirectUri);

			const token = await stripe.oauth.token({
				grant_type: "authorization_code",
				code,
				redirect_uri: redirectUri,
			});
			const stripeAccountId = token.stripe_user_id;

			await User.findOneAndUpdate({ id: userId }, { stripeAccountId });

			return { stripeAccountId };
		} catch (error) {
			throw new Error(`Failed to handle Stripe callback. ${error.message}`);
		}
	},
};

const payoutMethodResolver = {
	Query: payoutMethodQueryDef,
	Mutation: payoutMethodMutationDef,
};

export default payoutMethodResolver;
