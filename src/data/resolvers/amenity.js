import { gql } from "apollo-server-express";
import Amenity from "../models/amenity.js";
import uploadFile from "../../utils/file_uploader.js";
import Space from "../models/space.js";

export const amenityTypeDef = gql`
	type Query {
		getAmenities(filters: JSON): [Amenity]
		getAmenity(id: Int): Amenity
	}
	type Mutation {
		createAmenity(input: AmenityInput): Boolean
		updateAmenity(id: Int!, input: AmenityInput): Boolean
		deleteAmenity(id: Int!): Boolean
	}
`;

const amenityQueryDef = {
	getAmenities: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}

		const amenities = await Amenity.find({ ...filters, ...defaultFilters });
		return amenities;
	},
	getAmenity: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		return await Amenity.findOne({ id, ...defaultFilters });
	},
};

const amenityMutationDef = {
	createAmenity: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		var mergeInput = {};
		if (input["image"] != null) {
			let options = {
				uploadPath: "amenities",
				namePrefix: "amenity_",
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

		const amenity = new Amenity(data);

		try {
			await amenity.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateAmenity: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const amenity = await Amenity.findOne({ id });

		if (!amenity) {
			throw new Error("Amenity not found");
		}
		var mergeInput = { image: amenity.image };
		if (input["image"] != null) {
			let options = {
				uploadPath: "amenities",
				namePrefix: "amenity_",
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
				mergeInput["image"] = amenity.image;
			}
		}

		const data = { ...input, ...mergeInput };
		Object.assign(amenity, data);
		try {
			await amenity.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteAmenity: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const result = await Amenity.deleteOne({ id });
		if (result) {
			await Space.updateMany({ amenities: id }, { $pull: { amenities: id } });
		}

		return result !== null;
	},
};

const amenityResolver = {
	Query: amenityQueryDef,
	Mutation: amenityMutationDef,
};

export default amenityResolver;
