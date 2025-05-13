import { Schema, model } from "mongoose";

const specialFeatureSchema = new Schema(
	{
		id: {
			unique: true,
			type: Number,
		},
		name: { type: Map, of: String },
		description: { type: Map, of: String },
		status: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

specialFeatureSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await SpecialFeature.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const SpecialFeature = model("SpecialFeature", specialFeatureSchema, "specialFeatures");

export default SpecialFeature;
