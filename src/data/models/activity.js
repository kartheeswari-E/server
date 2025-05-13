import { Schema, model } from "mongoose";

const activitySchema = new Schema(
	{
		id: {
			unique: true,
			type: Number,
		},
		name: { type: Map, of: String },
		description: { type: Map, of: String },
		activityType: {
			type: Number,
		},
		image: {
			src: String,
			uploadDir: {
				type: String,
				default: "activities/",
			},
			uploadDriver: {
				type: Number,
				default: 0,
			},
		},
		isPopular: {
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

activitySchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await Activity.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const Activity = model("Activity", activitySchema, "activities");

export default Activity;
