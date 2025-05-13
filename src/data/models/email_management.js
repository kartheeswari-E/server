import { Schema, model } from "mongoose";

const emailManagementSchema = new Schema(
	{
		id: {
			type: Number,
			unique: true,
		},
		name: String,
		htmlContent: {
			type: String,
		},
		status: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

emailManagementSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await EmailManagement.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const EmailManagement = model("EmailManagement", emailManagementSchema, "email_managements");

export default EmailManagement;
