import { gql } from "apollo-server-express";
import SpecialFeature from "../models/special_feature.js";

export const specialFeatureTypeDef = gql`
	type Query {
		getSpecialFeatures(filters: JSON): [SpecialFeature]
		getSpecialFeature(id: Int): SpecialFeature
	}
	type Mutation {
		createSpecialFeature(input: SpecialFeatureInput!): Boolean
		updateSpecialFeature(id: Int!, input: SpecialFeatureInput): Boolean
		deleteSpecialFeature(id: Int!): Boolean
	}
`;

const specialFeatureQueryDef = {
	getSpecialFeatures: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		const SpecialFeatures = await SpecialFeature.find({ ...filters, ...defaultFilters });
		return SpecialFeatures;
	},
	getSpecialFeature: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		return await SpecialFeature.findOne({ id, ...defaultFilters });
	},
};

const specialFeatureMutationDef = {
	createSpecialFeature: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		var mergeInput = {};

		const data = { ...input, ...mergeInput };

		const specialFeature = new SpecialFeature(data);
		try {
			await specialFeature.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateSpecialFeature: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const specialFeature = await SpecialFeature.findOne({ id });

		if (!specialFeature) {
			throw new Error("specialFeature not found");
		}
		Object.assign(specialFeature, input);
		try {
			await specialFeature.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteSpecialFeature: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		try {
			const result = await SpecialFeature.findOneAndDelete({ id });
			return true;
		} catch (e) {
			return false;
		}
	},
};

const specialFeatureResolver = {
	Query: specialFeatureQueryDef,
	Mutation: specialFeatureMutationDef,
};

export default specialFeatureResolver;
