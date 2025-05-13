import { gql } from "apollo-server-express";

import PreFooter from "../models/pre_footer.js";
import uploadFile from "../../utils/file_uploader.js";

export const preFooterTypeDef = gql`
	type Query {
		getPreFooters(filters: JSON): [PreFooter]
		getPreFooter(id: Int): PreFooter
	}
	type Mutation {
		createPreFooter(input: PreFooterInput): Boolean
		updatePreFooter(id: Int!, input: PreFooterInput): Boolean
		deletePreFooter(id: Int!): Boolean
	}
`;

const preFooterQueryDef = {
	getPreFooters: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		const preFooters = await PreFooter.find({ ...filters, ...defaultFilters });
		return preFooters;
	},
	getPreFooter: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		return await PreFooter.findOne({ id, ...defaultFilters });
	},
};

const preFooterMutationDef = {
	createPreFooter: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		var mergeInput = {};
		if (input["image"] != null) {
			let options = {
				uploadPath: "pre_footers",
				namePrefix: "pre_footer_",
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
		const preFooter = new PreFooter(data);
		try {
			await preFooter.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updatePreFooter: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const preFooter = await PreFooter.findOne({ id });

		if (!preFooter) {
			throw new Error("PreFooter not found");
		}
		var mergeInput = { image: preFooter.image };
		if (input["image"] != null) {
			let options = {
				uploadPath: "pre_footers/",
				namePrefix: "pre_footer_",
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
				mergeInput["image"] = preFooter.image;
			}
		}

		const data = { ...input, ...mergeInput };
		Object.assign(preFooter, data);
		try {
			await preFooter.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deletePreFooter: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		try {
			const result = await PreFooter.findOneAndDelete({ id });
			return true;
		} catch (e) {
			return false;
		}
	},
};

const preFooterResolver = {
	Query: preFooterQueryDef,
	Mutation: preFooterMutationDef,
};

export default preFooterResolver;
