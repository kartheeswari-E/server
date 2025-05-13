import { Schema, model } from "mongoose";

const activityTypeSchema = new Schema(
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
				default: "activity_types/",
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

activityTypeSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await ActivityType.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const ActivityType = model("ActivityType", activityTypeSchema, "activity_types");

export default ActivityType;
