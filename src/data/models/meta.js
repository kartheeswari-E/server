import { Schema, model } from "mongoose";

const metaSchema = new Schema(
	{
		id: {
			unique: true,
			type: Number,
		},
		routeName: String,
		displayName: String,
		title: { type: Map, of: String },
		description: { type: Map, of: String },
		keywords: { type: Map, of: String },
	},
	{ timestamps: true },
);

metaSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await Meta.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const Meta = model("Meta", metaSchema, "metas");

export default Meta;
