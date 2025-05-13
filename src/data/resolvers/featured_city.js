import { gql } from "apollo-server-express";

import FeaturedCity from "../models/featured_city.js";
import uploadFile from "../../utils/file_uploader.js";

export const featuredCityTypeDef = gql`
	type Query {
		getFeaturedCities(filters: JSON): [FeaturedCity]
		getFeaturedCity(id: Int): FeaturedCity
	}
	type Mutation {
		createFeaturedCity(input: FeaturedCityInput): Boolean
		updateFeaturedCity(id: Int!, input: FeaturedCityInput): Boolean
		deleteFeaturedCity(id: Int!): Boolean
	}
`;

const featuredCityQueryDef = {
	getFeaturedCities: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		const featuredCitys = await FeaturedCity.find({ ...filters, ...defaultFilters });

		return featuredCitys;
	},
	getFeaturedCity: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		return await FeaturedCity.findOne({ id, ...defaultFilters });
	},
};

const featuredCityMutationDef = {
	createFeaturedCity: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}

		var mergeInput = {};
		if (input["image"] != null) {
			let options = {
				uploadPath: "featured_cities",
				namePrefix: "featured_city_",
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

		const featuredCity = new FeaturedCity(data);
		try {
			await featuredCity.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateFeaturedCity: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}

		const featuredCity = await FeaturedCity.findOne({ id });

		if (!featuredCity) {
			throw new Error("FeaturedCity not found");
		}
		var mergeInput = { image: featuredCity.image };
		if (input["image"] != null) {
			let options = {
				uploadPath: "featured_cities",
				namePrefix: "featured_city_",
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
				mergeInput["image"] = featuredCity.image;
			}
		}

		const data = { ...input, ...mergeInput };
		Object.assign(featuredCity, data);
		try {
			await featuredCity.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteFeaturedCity: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}

		const result = await FeaturedCity.findOneAndDelete({ id });
		return result.deletedCount > 0;
	},
};

const featuredCityResolver = {
	Query: featuredCityQueryDef,
	Mutation: featuredCityMutationDef,
};

export default featuredCityResolver;
