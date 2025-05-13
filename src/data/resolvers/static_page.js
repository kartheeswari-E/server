import { gql } from "apollo-server-express";
import StaticPage from "../models/static_page.js";

export const staticPageTypeDef = gql`
	type Query {
		getStaticPages(filters: JSON): [StaticPage]
		getStaticPage(id: Int): StaticPage
	}
	type Mutation {
		createStaticPage(input: StaticPageInput!): Boolean
		updateStaticPage(id: Int!, input: StaticPageInput): Boolean
		deleteStaticPage(id: Int!): Boolean
	}
`;

const staticPageQueryDef = {
	getStaticPages: async (_) => {
		const staticPages = await StaticPage.find({});
		return staticPages;
	},
	getStaticPage: async (_, { id }) => {
		return await StaticPage.findOne({ id });
	},
};

const staticPageMutationDef = {
	createStaticPage: async (_, { input }) => {
		var mergeInput = {};

		const data = { ...input, ...mergeInput };

		const staticPage = new StaticPage(data);
		try {
			await staticPage.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateStaticPage: async (_, { id, input }) => {
		const staticPage = await StaticPage.findOne({ id });

		if (!staticPage) {
			throw new Error("Static Page not found");
		}
		Object.assign(staticPage, input);
		try {
			await staticPage.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteStaticPage: async (_, { id }) => {
		const result = await StaticPage.findOneAndDelete({ id });
		return result.deletedCount > 0;
	},
};

const staticPageResolver = {
	Query: staticPageQueryDef,
	Mutation: staticPageMutationDef,
};

export default staticPageResolver;
