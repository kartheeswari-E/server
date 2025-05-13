import { Schema, model } from "mongoose";
import Joi from "joi";

const currencySchema = new Schema(
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
		symbol: String,
		rate: Number,
		status: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

currencySchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await Currency.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

export const currencyValidation = Joi.object({
	id: Joi.number().optional(),
	name: Joi.string().optional().messages({
		"any.optional": "Name - The Name field is optional.",
	}),
	code: Joi.string().optional().messages({
		"any.optional": "Code - The Code field is optional.",
		"string.pattern.name": "Code - The Code has already been taken.",
	}),
	symbol: Joi.string().optional().messages({
		"any.optional": "Symbol - The Symbol field is optional.",
	}),
	rate: Joi.number().optional().messages({
		"any.optional": "Rate - The Rate field is optional.",
	}),
	status: Joi.boolean().optional().messages({
		"any.optional": "Status - The Status field is optional.",
	}),
});

const Currency = model("Currency", currencySchema, "currencies");

export default Currency;
