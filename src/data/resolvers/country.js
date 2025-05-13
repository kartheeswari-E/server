import { gql } from "apollo-server-express";
import Country from "../models/country.js";
import uploadFile from "../../utils/file_uploader.js";

export const countryTypeDef = gql`
	type Query {
		getCountries(filters: JSON): [Country]
		getCountry(id: Int): Country
	}
	type Mutation {
		createCountry(input: CountryInput!): Boolean
		updateCountry(id: Int!, input: CountryInput): Boolean
		deleteCountry(id: Int!): Boolean
	}
`;

const countryQueryDef = {
	getCountries: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		const countries = await Country.find({ ...filters, ...defaultFilters });
		return countries;
	},
	getCountry: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		return await Country.findOne({ id, ...defaultFilters });
	},
};

const countryMutationDef = {
	createCountry: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		let mergeInput = {};

		if (input["image"] != null) {
			let options = {
				uploadPath: "countries",
				namePrefix: "country_",
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
				console.error(e);
			}
		}
		const data = { ...input, ...mergeInput };

		const country = new Country(data);
		try {
			await country.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateCountry: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const country = await Country.findOne({ id });

		if (!country) {
			throw new Error("Country not found");
		}

		let mergeInput = {};

		if (input["image"] != null) {
			let options = {
				uploadPath: "countries",
				namePrefix: "country_",
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

		Object.assign(country, { ...input, ...mergeInput });
		try {
			await country.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteCountry: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const result = await Country.findOneAndDelete({ id });
		return result.deletedCount > 0;
	},
};

const countryResolver = {
	Query: countryQueryDef,
	Mutation: countryMutationDef,
};

export default countryResolver;
