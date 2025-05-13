import Joi from "joi";
import { Schema, model } from "mongoose";

const countrySchema = new Schema(
	{
		id: {
			unique: true,
			type: Number,
		},
		code: {
			unique: true,
			type: String,
		},
		name: String,
		image: {
			src: String,
			uploadDir: {
				type: String,
				default: "countries/",
			},
			uploadDriver: {
				type: Number,
				default: 0,
			},
		},
		phoneCode: String,
		currencyCode: String,
		languageCode: String,
		status: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: false },
);

countrySchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await Country.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

export const countryValidation = Joi.object({
	id: Joi.number().optional(),
	name: Joi.string().required().messages({
		"any.required": "Full Name - The Full Name field is required.",
	}),
	code: Joi.string().required().messages({
		"any.required": "Code - The Code field is required.",
		"string.pattern.name": "Code - The Code has already been taken.",
	}),
	phoneCode: Joi.string().required().messages({
		"any.required": "Phone Code - The Phone Code field is required.",
	}),
});

const Country = model("Country", countrySchema, "countries");

export default Country;
