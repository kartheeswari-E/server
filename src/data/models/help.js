import { Schema, model } from "mongoose";

const helpSchema = new Schema(
	{
		id: {
			unique: true,
			type: Number,
		},
		title: { type: Map, of: String },
		description: { type: Map, of: String },
		slug: String,
		image: {
			src: String,
			uploadDriver: {
				type: Number,
				default: 0,
			},
		},
		helps: [
			{
				id: {
					type: Number,
				},
				slug: String,
				title: { type: Map, of: String },
				content: { type: Map, of: String },
				tags: String,
				isRecommended: {
					type: Boolean,
					default: false,
				},
				status: {
					type: Boolean,
					default: true,
				},
				createdAt: {
					type: Date,
					default: Date.now,
				},
				updatedAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
		status: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

helpSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await Help.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const Help = model("Help", helpSchema, "helps");

export default Help;
