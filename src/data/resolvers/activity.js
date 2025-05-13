import { gql } from "apollo-server-express";

import uploadFile from "../../utils/file_uploader.js";

import Activity from "../models/activity.js";

export const activityTypeDef = gql`
	type Query {
		getActivities(filters: JSON): [Activity]
		getActivity(id: Int): Activity
	}
	type Mutation {
		createActivity(input: ActivityInput): Boolean
		updateActivity(id: Int!, input: ActivityInput): Boolean
		deleteActivity(id: Int!): Boolean
	}
`;

const activityQueryDef = {
	getActivities: async (_, { filters }) => {
		const getActivities = await Activity.find(filters);
		return getActivities;
	},
	getActivity: async (_, { id }) => {
		return await Activity.findOne({ id });
	},
};

const activityMutationDef = {
	createActivity: async (_, { input }) => {
		var mergeInput = {};
		if (input["image"] != null) {
			let options = {
				uploadPath: "activity_types",
				namePrefix: "activity_",
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
		const activity = new Activity(data);
		try {
			await activity.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateActivity: async (_, { id, input }) => {
		const activity = await Activity.findOne({ id });

		if (!activity) {
			throw new Error("activity not found");
		}
		var mergeInput = { image: activity.image };
		if (input["image"] != null) {
			let options = {
				uploadPath: "activity_types/",
				namePrefix: "activity_",
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
				mergeInput["image"] = activity.image;
			}
		}

		const data = { ...input, ...mergeInput };
		Object.assign(activity, data);
		try {
			await activity.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteActivity: async (_, { id }) => {
		const result = await Activity.findOneAndDelete({ id });
		return result !== null; // Returns true if a document was deleted, false otherwise
	},
};

const activityResolver = {
	Query: activityQueryDef,
	Mutation: activityMutationDef,
};

export default activityResolver;
