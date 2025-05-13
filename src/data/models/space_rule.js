import { Schema, model } from "mongoose";

const spaceRuleSchema = new Schema(
	{
		id: {
			unique: true,
			type: Number,
		},
		name: { type: Map, of: String },
		description: { type: Map, of: String },
		image: {
			src: String,
			uploadDir: {
				type: String,
				default: "space_rules",
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

spaceRuleSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await SpaceRule.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const SpaceRule = model("SpaceRule", spaceRuleSchema, "spaceRules");

export default SpaceRule;
