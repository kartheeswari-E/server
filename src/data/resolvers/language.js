import { gql } from "apollo-server-express";
import Language from "../models/language.js";

export const languageTypeDef = gql`
	type Query {
		getLanguages(filters: JSON): [Language]
		getLanguage(id: Int): Language
	}
	type Mutation {
		createLanguage(input: LanguageInput!): Boolean
		updateLanguage(id: Int!, input: LanguageInput): Boolean
		deleteLanguage(id: Int!): Boolean
	}
`;

const languageQueryDef = {
	getLanguages: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		const languages = await Language.find(filters);
		return languages;
	},
	getLanguage: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		return await Language.findOne({ id });
	},
};

const languageMutationDef = {
	createLanguage: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const language = new Language(input);
		try {
			await language.save();
			return true;
		} catch (e) {
			return false;
		}
	},

	updateLanguage: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const language = await Language.findOne({ id });

		if (!language) {
			throw new Error("Language not found");
		}
		Object.assign(language, input);
		try {
			await language.save();
			return true;
		} catch (e) {
			return false;
		}
	},

	deleteLanguage: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const result = await Language.findOneAndDelete({ id });
		return result.deletedCount > 0;
	},
};

const languageResolver = {
	Query: languageQueryDef,
	Mutation: languageMutationDef,
};

export default languageResolver;
