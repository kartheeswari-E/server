import { gql } from "apollo-server-express";
import LoginSlider from "../models/login_slider.js";
import uploadFile from "../../utils/file_uploader.js";

export const loginSliderTypeDef = gql`
	type Query {
		getLoginSliders(filters: JSON): [LoginSlider]
		getLoginSlider(id: Int): LoginSlider
	}
	type Mutation {
		createLoginSlider(input: LoginSliderInput): Boolean
		updateLoginSlider(id: Int!, input: LoginSliderInput): Boolean
		deleteLoginSlider(id: Int!): Boolean
	}
`;

const loginSliderQueryDef = {
	getLoginSliders: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user?.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		const loginSliders = await LoginSlider.find({ ...filters, ...defaultFilters });
		return loginSliders;
	},
	getLoginSlider: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		return await LoginSlider.findOne({ id, ...defaultFilters });
	},
};

const loginSliderMutationDef = {
	createLoginSlider: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		var mergeInput = {};

		if (input["image"] != null) {
			let options = {
				uploadPath: "sliders",
				namePrefix: "slider_",
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
		const slider = new LoginSlider(data);
		try {
			await slider.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateLoginSlider: async (_, { id, input }, context) => {
		if (!context.user && context?.user?.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const slider = await LoginSlider.findOne({ id });

		if (!slider) {
			throw new Error("Login Slider not found");
		}
		var mergeInput = { image: slider.image };
		if (input["image"] != null) {
			let options = {
				uploadPath: "sliders/",
				namePrefix: "slider_",
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
				mergeInput["image"] = slider.image;
			}
		}
		const data = { ...input, ...mergeInput };
		Object.assign(slider, data);
		try {
			await slider.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteLoginSlider: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		try {
			const result = await LoginSlider.findOneAndDelete({ id });
			return true;
		} catch (e) {
			return false;
		}
	},
};

const loginSliderResolver = {
	Query: loginSliderQueryDef,
	Mutation: loginSliderMutationDef,
};

export default loginSliderResolver;
