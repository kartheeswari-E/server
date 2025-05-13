import Joi from "joi";
import { Schema, model } from "mongoose";

const languageSchema = new Schema(
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
		isTranslatable: {
			type: Boolean,
			default: false,
		},
		status: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

languageSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await Language.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

export const languageValidation = Joi.object({
	id: Joi.number().optional().messages({
		"any.required": "Name - The Name field is required.",
	}),
	name: Joi.string().required().messages({
		"any.required": "Name - The Name field is required.",
	}),
	code: Joi.string().required().messages({
		"any.required": "Code - The Code field is required.",
		"string.pattern.name": "Code - The Code has already been taken.",
	}),
	status: Joi.boolean().required().messages({
		"any.required": "Status - The Status field is required.",
	}),
	isTranslatable: Joi.boolean().required().messages({
		"any.required": "IsTranslatable - The IsTranslatable field is required.",
	}),
});

const Language = model("Language", languageSchema, "languages");

export default Language;
