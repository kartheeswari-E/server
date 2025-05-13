import { gql } from "apollo-server-express";

import GuestAccess from "../models/guest_access.js";
import uploadFile from "../../utils/file_uploader.js";

export const guestAccessTypeDef = gql`
	type Query {
		getGuestAccesses(filters: JSON): [GuestAccess]
		getGuestAccess(id: Int): GuestAccess
	}
	type Mutation {
		createGuestAccess(input: GuestAccessInput): Boolean
		updateGuestAccess(id: Int!, input: GuestAccessInput): Boolean
		deleteGuestAccess(id: Int!): Boolean
	}
`;

const guestAccessQueryDef = {
	getGuestAccesses: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		const guestAccesses = await GuestAccess.find({ ...filters, ...defaultFilters });
		return guestAccesses;
	},
	getGuestAccess: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		return await GuestAccess.findOne({ id, ...defaultFilters });
	},
};

const guestAccessMutationDef = {
	createGuestAccess: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		var mergeInput = {};
		if (input["image"] != null) {
			let options = {
				uploadPath: "guest_accesses",
				namePrefix: "guest_access_",
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
		const guestAccess = new GuestAccess(data);
		try {
			await guestAccess.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateGuestAccess: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const guestAccess = await GuestAccess.findOne({ id });

		if (!guestAccess) {
			throw new Error("GuestAccess not found");
		}
		var mergeInput = { image: guestAccess.image };
		if (input["image"] != null) {
			let options = {
				uploadPath: "guest_accesses/",
				namePrefix: "guest_access_",
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
				mergeInput["image"] = guestAccess.image;
			}
		}

		const data = { ...input, ...mergeInput };
		Object.assign(guestAccess, data);
		try {
			await guestAccess.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteGuestAccess: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const result = await GuestAccess.findOneAndDelete({ id });
		return result.deletedCount > 0;
	},
};

const guestAccessResolver = {
	Query: guestAccessQueryDef,
	Mutation: guestAccessMutationDef,
};

export default guestAccessResolver;
