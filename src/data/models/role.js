import { Schema, model } from "mongoose";

const roleSchema = new Schema(
	{
		id: {
			unique: true,
			type: Number,
		},
		name: String,

		description: String,
		status: {
			type: Boolean,
			default: true,
		},
		permissions: [Number],
	},
	{ timestamps: true },
);

roleSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await Role.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const Role = model("Role", roleSchema, "roles");

export default Role;
