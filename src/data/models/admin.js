import { Schema, model } from "mongoose";
import { genSalt, hash } from "bcrypt";
import Joi from "joi";

const adminSchema = new Schema(
	{
		id: {
			unique: true,
			type: Number,
		},
		name: String,
		email: {
			unique: true,
			type: String,
		},
		password: String,
		countryCode: String,
		phoneCode: String,
		phoneNumber: String,
		timezone: String,
		userLanguage: String,
		userCurrency: String,
		image: {
			src: {
				type: String,
				default: "profile.png",
			},
			uploadDir: {
				type: String,
				default: "admins/",
			},
			uploadDriver: {
				type: Number,
				default: 0,
			},
		},
		roleId: Number,
		primary: {
			type: Boolean,
			default: false,
		},
		status: {
			type: Boolean,
			default: false,
		},
		deletedData: String,
		deletedAt: Date,
	},
	{ timestamps: true },
);

adminSchema.pre("save", async function (next) {
	try {
		if (this.isModified("password")) {
			const salt = await genSalt(10);
			this.password = await hash(this.password, salt);
		}
		if (this.isNew && !this.id) {
			const lastItem = await Admin.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
		}
		next();
	} catch (err) {
		next(err);
	}
});

export const adminValidation = Joi.object().keys({
	firstName: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
	userLanguage: Joi.string().required(),
	userCurrency: Joi.string().required(),
	status: Joi.boolean().required(),
	primary: Joi.boolean().required(),
});

const Admin = model("Admin", adminSchema, "admins");

export default Admin;
