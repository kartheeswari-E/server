import { gql } from "apollo-server-express";

import uploadFile from "../../utils/file_uploader.js";
import ActivityType from "../models/activity_type.js";

export const activityTypeTypeDef = gql`
	type Query {
		getActivityTypes(filters: JSON): [ActivityType]
		getActivityType(id: Int): ActivityType
	}
	type Mutation {
		createActivityType(input: ActivityTypeInput): Boolean
		updateActivityType(id: Int!, input: ActivityTypeInput): Boolean
		deleteActivityType(id: Int!): Boolean
	}
`;

const activityTypeQueryDef = {
	getActivityTypes: async (_, { filters }, context) => {
		const activityType = await ActivityType.find(filters);
		return activityType;
	},
	getActivityType: async (_, { id }) => {
		return await ActivityType.findOne({ id });
	},
};

const activityTypeMutationDef = {
	createActivityType: async (_, { input }) => {
		var mergeInput = {};
		if (input["image"] != null) {
			let options = {
				uploadPath: "activity_types",
				namePrefix: "activity_type_",
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
		const activityType = new ActivityType(data);
		try {
			await activityType.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateActivityType: async (_, { id, input }) => {
		const activityType = await ActivityType.findOne({ id });

		if (!activityType) {
			throw new Error("activityType not found");
		}
		var mergeInput = { image: activityType.image };
		if (input["image"] != null) {
			let options = {
				uploadPath: "activity_types/",
				namePrefix: "activity_type_",
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
				mergeInput["image"] = activityType.image;
			}
		}

		const data = { ...input, ...mergeInput };
		Object.assign(activityType, data);
		try {
			await activityType.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteActivityType: async (_, { id }) => {
		const result = await ActivityType.findOneAndDelete({ id });
		return result !== null; // Returns true if a document was deleted, false otherwise
	},
};

const activityTypeResolver = {
	Query: activityTypeQueryDef,
	Mutation: activityTypeMutationDef,
};

export default activityTypeResolver;
