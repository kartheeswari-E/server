import { gql } from "apollo-server-express";
import SpaceRule from "../models/space_rule.js";
import uploadFile from "../../utils/file_uploader.js";
import Space from "../models/space.js";

export const spaceRuleTypeDef = gql`
	type Query {
		getSpaceRules(filters: JSON): [SpaceRule]
		getSpaceRule(id: Int): SpaceRule
	}
	type Mutation {
		createSpaceRule(input: SpaceRuleInput!): Boolean
		updateSpaceRule(id: Int!, input: SpaceRuleInput): Boolean
		deleteSpaceRule(id: Int!): Boolean
	}
`;

const spaceRuleQueryDef = {
	getSpaceRules: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		const spaceRules = await SpaceRule.find({ ...filters, ...defaultFilters });
		return spaceRules;
	},
	getSpaceRule: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		return await SpaceRule.findOne({ id, ...defaultFilters });
	},
};

const spaceRuleMutationDef = {
	createSpaceRule: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		var mergeInput = {};
		if (input["image"] != null) {
			let options = {
				uploadPath: "space_rules",
				namePrefix: "space_rule_",
				addTime: true,
			};
			try {
				const result = await uploadFile(input["image"], options);
				mergeInput["image"] = {
					src: result.name,
					uploadDriver: result.uploadDriver,
					uploadDir: result.uploadDir,
				};
			} catch (e) {}
		}

		const data = { ...input, ...mergeInput };
		const spaceRule = new SpaceRule(data);
		try {
			await spaceRule.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateSpaceRule: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const spaceRule = await SpaceRule.findOne({ id });

		if (!spaceRule) {
			throw new Error("spaceRule not found");
		}
		var mergeInput = { image: spaceRule.image };
		if (input["image"] != null) {
			let options = {
				uploadPath: "space_rules",
				namePrefix: "space_rule_",
				addTime: true,
			};
			try {
				const result = await uploadFile(input["image"], options);
				mergeInput["image"] = {
					src: result.name,
					uploadDriver: result.uploadDriver,
					uploadDir: result.uploadDir,
				};
			} catch (e) {
				mergeInput["image"] = spaceRule.image;
			}
		}

		const data = { ...input, ...mergeInput };

		Object.assign(spaceRule, data);
		try {
			await spaceRule.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteSpaceRule: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const result = await SpaceRule.findOneAndDelete({ id });
		if (result) {
			await Space.updateMany({ spaceRules: id }, { $pull: { spaceRules: id } });
		}

		return result !== null;
	},
};

const spaceRuleResolver = {
	Query: spaceRuleQueryDef,
	Mutation: spaceRuleMutationDef,
};

export default spaceRuleResolver;
