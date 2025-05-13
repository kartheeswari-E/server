import { gql } from "apollo-server-express";
import Slider from "../models/slider.js";
import uploadFile from "../../utils/file_uploader.js";

export const sliderTypeDef = gql`
	type Query {
		getSliders(filters: JSON): [Slider]
		getSlider(id: Int): Slider
	}
	type Mutation {
		createSlider(input: SliderInput): Boolean
		updateSlider(id: Int!, input: SliderInput): Boolean
		deleteSlider(id: Int!): Boolean
	}
`;

const sliderQueryDef = {
	getSliders: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		const sliders = await Slider.find({ ...filters, ...defaultFilters });
		return sliders;
	},
	getSlider: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		return await Slider.findOne({ id, ...defaultFilters });
	},
};

const sliderMutationDef = {
	createSlider: async (_, { input }, context) => {
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
		const slider = new Slider(data);

		try {
			await slider.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateSlider: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const slider = await Slider.findOne({ id });

		if (!slider) {
			throw new Error("Slider not found");
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
	deleteSlider: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		try {
			const result = await Slider.findOneAndDelete({ id });
			return true;
		} catch (e) {
			return false;
		}
	},
};

const sliderResolver = {
	Query: sliderQueryDef,
	Mutation: sliderMutationDef,
};

export default sliderResolver;
