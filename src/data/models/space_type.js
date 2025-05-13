import { Schema, model } from "mongoose";

const spaceTypeSchema = new Schema(
	{
		id: {
			unique: true,
			type: Number,
		},
		name: { type: Map, of: String },
		image: {
			src: String,
			uploadDir: {
				type: String,
				default: "space_types/",
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

spaceTypeSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await SpaceType.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const SpaceType = model("SpaceType", spaceTypeSchema, "space_types");

export default SpaceType;
