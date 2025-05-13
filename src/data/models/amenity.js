import { Schema, model } from "mongoose";
import Joi from "joi";

const amenitySchema = new Schema(
	{
		id: {
			type: Number,
			index: {
				unique: true,
				partialFilterExpression: { id: { $type: "string" } },
			},
		},
		name: { type: Map, of: String },
		description: { type: Map, of: String },
		image: {
			src: String,
			uploadDir: {
				type: String,
				default: "amenities/",
			},
			uploadDriver: {
				type: Number,
				default: 0,
			},
		},
		status: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

amenitySchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await Amenity.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

export const amenityValidation = Joi.array().items(
	Joi.object().keys({
		type: Joi.string().valid("hotel", "room").required(),
		name: Joi.object().pattern(Joi.string(), Joi.string()).required().min(1),
		description: Joi.object().pattern(Joi.string(), Joi.string()).required().min(1),
		status: Joi.boolean().required(),
	}),
);

const Amenity = model("Amenity", amenitySchema, "amenities");

export default Amenity;
