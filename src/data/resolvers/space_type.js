import { gql } from "apollo-server-express";

import uploadFile from "../../utils/file_uploader.js";
import SpaceType from "../models/space_type.js";

export const spaceTypeTypeDef = gql`
	type Query {
		getSpaceTypes(filters: JSON): [SpaceType]
		getSpaceType(id: Int): SpaceType
	}
	type Mutation {
		createSpaceType(input: SpaceTypeInput): Boolean
		updateSpaceType(id: Int!, input: SpaceTypeInput): Boolean
		deleteSpaceType(id: Int!): Boolean
	}
`;

const spaceTypeQueryDef = {
	getSpaceTypes: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = true;
		}
		const spaceTypes = await SpaceType.find({ ...filters, ...defaultFilters });
		return spaceTypes;
	},
	getSpaceType: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = true;
		}
		return await SpaceType.findOne({ id, ...defaultFilters });
	},
};

const spaceTypeMutationDef = {
	createSpaceType: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		var mergeInput = {};
		if (input["image"] != null) {
			let options = {
				uploadPath: "space_types",
				namePrefix: "space_type_",
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
		const spaceType = new SpaceType(data);
		try {
			await spaceType.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateSpaceType: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const spaceType = await SpaceType.findOne({ id });

		if (!spaceType) {
			throw new Error("Space Type not found");
		}
		var mergeInput = { image: spaceType.image };
		if (input["image"] != null) {
			let options = {
				uploadPath: "space_types/",
				namePrefix: "space_type_",
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
				mergeInput["image"] = spaceType.image;
			}
		}

		const data = { ...input, ...mergeInput };
		Object.assign(spaceType, data);
		try {
			await spaceType.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteSpaceType: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		try {
			const result = await SpaceType.findOneAndDelete({ id });
			return true;
		} catch (e) {
			return false;
		}
	},
};

const spaceTypeResolver = {
	Query: spaceTypeQueryDef,
	Mutation: spaceTypeMutationDef,
};

export default spaceTypeResolver;
