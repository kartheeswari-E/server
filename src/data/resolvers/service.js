import { gql } from "apollo-server-express";
import Service from "../models/service.js";

export const serviceTypeDef = gql`
	type Query {
		getServices(filters: JSON): [Service]
		getService(id: Int): Service
	}
	type Mutation {
		createService(input: ServiceInput!): Boolean
		updateService(id: Int!, input: ServiceInput): Boolean
		deleteService(id: Int!): Boolean
	}
`;

const serviceQueryDef = {
	getServices: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		const services = await Service.find({ ...filters, ...defaultFilters });
		return services;
	},
	getService: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		return await Service.findOne({ id, ...defaultFilters });
	},
};

const serviceMutationDef = {
	createService: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		var mergeInput = {};

		const data = { ...input, ...mergeInput };

		const service = new Service(data);
		try {
			await service.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateService: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const service = await Service.findOne({ id });

		if (!service) {
			throw new Error("service not found");
		}
		Object.assign(service, input);
		try {
			await service.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteService: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const result = await Service.findOneAndDelete({ id });
		return result.deletedCount > 0;
	},
};

const serviceResolver = {
	Query: serviceQueryDef,
	Mutation: serviceMutationDef,
};

export default serviceResolver;
