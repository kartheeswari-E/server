import { gql } from "apollo-server-express";

import Meta from "../models/meta.js";

export const metaTypeDef = gql`
	type Query {
		getMetas(filters: JSON): [Meta]
		getMeta(id: Int): Meta
		getFolderMeta(folderName: String): Meta
	}
	type Mutation {
		updateMeta(id: Int!, input: MetaInput): Boolean
	}
`;

const metaQueryDef = {
	getMetas: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		const metas = await Meta.find({ ...filters, ...defaultFilters });
		return metas;
	},
	getMeta: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		return await Meta.findOne({ id, ...defaultFilters });
	},
	getFolderMeta: async (_, { folderName }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		return await Meta.findOne({ routeName: folderName });
	},
};

const metaMutationDef = {
	updateMeta: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const meta = await Meta.findOne({ id });

		if (!meta) {
			throw new Error("Meta not found");
		}

		const data = { ...input };
		Object.assign(meta, data);
		try {
			await meta.save();
			return true;
		} catch (e) {
			return false;
		}
	},
};

const metaResolver = {
	Query: metaQueryDef,
	Mutation: metaMutationDef,
};

export default metaResolver;
