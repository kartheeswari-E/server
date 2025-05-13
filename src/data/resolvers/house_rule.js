import { gql } from "apollo-server-express";

import HouseRule from "../models/house_rule.js";
import uploadFile from "../../utils/file_uploader.js";

export const houseRuleTypeDef = gql`
	type Query {
		getHouseRules(filters: JSON): [HouseRule]
		getHouseRule(id: Int): HouseRule
	}
	type Mutation {
		createHouseRule(input: HouseRuleInput): Boolean
		updateHouseRule(id: Int!, input: HouseRuleInput): Boolean
		deleteHouseRule(id: Int!): Boolean
	}
`;

const houseRuleQueryDef = {
	getHouseRules: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		const houseRules = await HouseRule.find({ ...filters, ...defaultFilters });
		return houseRules;
	},
	getHouseRule: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		return await HouseRule.findOne({ id, ...defaultFilters });
	},
};

const houseRuleMutationDef = {
	createHouseRule: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}

		var mergeInput = {};
		if (input["image"] != null) {
			let options = {
				uploadPath: "house_rules",
				namePrefix: "house_rule_",
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
		const houseRule = new HouseRule(data);
		try {
			await houseRule.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateHouseRule: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const houseRule = await HouseRule.findOne({ id });

		if (!houseRule) {
			throw new Error("HouseRule not found");
		}
		var mergeInput = { image: houseRule.image };
		if (input["image"] != null) {
			let options = {
				uploadPath: "house_rules/",
				namePrefix: "house_rule_",
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
				mergeInput["image"] = houseRule.image;
			}
		}

		const data = { ...input, ...mergeInput };
		Object.assign(houseRule, data);
		try {
			await houseRule.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteHouseRule: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const result = await HouseRule.findOneAndDelete({ id });
		return result.deletedCount > 0;
	},
};

const houseRuleResolver = {
	Query: houseRuleQueryDef,
	Mutation: houseRuleMutationDef,
};

export default houseRuleResolver;
