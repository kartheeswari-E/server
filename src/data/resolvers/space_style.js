import { gql } from "apollo-server-express";
import SpaceStyle from "../models/space_styles.js";

export const spaceStyleTypeDef = gql`
	type Query {
		getSpaceStyles(filters: JSON): [SpaceStyle]
		getSpaceStyle(id: Int): SpaceStyle
	}
	type Mutation {
		createSpaceStyle(input: SpaceStyleInput!): Boolean
		updateSpaceStyle(id: Int!, input: SpaceStyleInput): Boolean
		deleteSpaceStyle(id: Int!): Boolean
	}
`;

const spaceStyleQueryDef = {
	getSpaceStyles: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		const spaveStyle = await SpaceStyle.find({ ...filters, ...defaultFilters });
		return spaveStyle;
	},
	getSpaceStyle: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		return await SpaceStyle.findOne({ id, ...defaultFilters });
	},
};

const spaceStyleMutationDef = {
	createSpaceStyle: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		var mergeInput = {};

		const data = { ...input, ...mergeInput };

		const spaceStyle = new SpaceStyle(data);
		try {
			await spaceStyle.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateSpaceStyle: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const spaceStyle = await SpaceStyle.findOne({ id });

		if (!spaceStyle) {
			throw new Error("spaceStyle not found");
		}
		Object.assign(spaceStyle, input);
		try {
			await spaceStyle.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteSpaceStyle: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const result = await SpaceStyle.findOneAndDelete({ id });
		return result.deletedCount > 0;
	},
};

const spaceStyleResolver = {
	Query: spaceStyleQueryDef,
	Mutation: spaceStyleMutationDef,
};

export default spaceStyleResolver;
