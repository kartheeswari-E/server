import { gql } from "apollo-server-express";
import Currency from "../models/currency.js";

export const currencyTypeDef = gql`
	type Query {
		getCurrencies(filters: JSON): [Currency]
		getCurrency(id: Int): Currency
	}
	type Mutation {
		createCurrency(input: CurrencyInput!): Boolean
		updateCurrency(id: Int!, input: CurrencyInput): Boolean
		deleteCurrency(id: Int!): Boolean
	}
`;

const currencyQueryDef = {
	getCurrencies: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		const currencies = await Currency.find({ ...filters, ...defaultFilters });
		return currencies;
	},
	getCurrency: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		return await Currency.findOne({ id, ...defaultFilters });
	},
};

const currencyMutationDef = {
	createCurrency: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}

		var mergeInput = {};

		const data = { ...input, ...mergeInput };

		const currency = new Currency(data);
		try {
			await currency.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateCurrency: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}

		const currency = await Currency.findOne({ id });

		if (!currency) {
			throw new Error("Currency not found");
		}
		Object.assign(currency, input);
		try {
			await currency.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteCurrency: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}

		const result = await Currency.findOneAndDelete({ id });
		return result.deletedCount > 0;
	},
};

const currencyResolver = {
	Query: currencyQueryDef,
	Mutation: currencyMutationDef,
};

export default currencyResolver;
