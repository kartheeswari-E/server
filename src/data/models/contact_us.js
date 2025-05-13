import { Schema, model } from "mongoose";

const contactUsSchema = new Schema(
	{
		id: {
			unique: true,
			type: Number,
		},
		name: { type: String },
		email: { type: String },
		feedback: { type: String },
		adminFeedback: { type: String },
	},
	{ timestamps: true },
);

contactUsSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await ContactUs.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 10001;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const ContactUs = model("ContactUs", contactUsSchema, "contact_us");

export default ContactUs;
