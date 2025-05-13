import { Schema, model } from "mongoose";
import { genSalt, hash } from "bcrypt";

const userSchema = new Schema(
	{
		id: {
			type: Number,
			unique: true,
		},
		stripeCustomerId: String, // Stripe Customer ID
		userName: String,
		firstName: String,
		lastName: String,
		email: {
			unique: true,
			type: String,
		},
		password: String,
		hostStatus: { type: Boolean, default: false },
		countryCode: String,
		phoneCode: String,
		phoneNumber: String,
		googleId: String,
		facebookId: String,
		appleId: String,
		timezone: String,
		userLanguage: String,
		userCurrency: String,
		dob: Date,
		gender: String,
		about: String,
		location: String,
		work: String,
		languages: [String],
		paymentMethods: [
			{
				paymentMethodId: { type: String }, // Stripe's Payment Method ID
				brand: { type: String }, // Card brand (e.g., Visa)
				last4: { type: String }, // Last 4 digits of the card
				expMonth: { type: Number }, // Card expiration month
				expYear: { type: Number }, // Card expiration year
			},
		],
		image: {
			src: String,
			uploadDir: String,
			uploadDriver: {
				type: Number,
				default: 0,
			},
		},
		document: {
			image: {
				src: String,
				uploadDir: String,
				uploadDriver: {
					type: Number,
					default: 0,
				},
			},
			rejectedReason: String,
			status: {
				type: String,
				enum: ["pending", "resubmit", "verified"],
				default: "pending",
			},
		},
		status: {
			type: String,
			enum: ["pending", "active", "inactive"],
		},
		lastActiveAt: Date,
		deletedData: String,
		deletedAt: Date,
		verifications: {
			email: {
				type: Boolean,
				default: 0,
			},
			phoneNumber: {
				type: Boolean,
				default: 0,
			},
			facebook: {
				type: Boolean,
				default: 0,
			},
			google: {
				type: Boolean,
				default: 0,
			},
			apple: {
				type: Boolean,
				default: 0,
			},
			idDocument: {
				type: Boolean,
				default: 0,
			},
		},
	},
	{ timestamps: true },
);

userSchema.virtual("payoutMethodList", {
	ref: "PayoutMethod",
	localField: "id",
	foreignField: "userId",
});

userSchema.pre("save", async function (next) {
	try {
		if (this.isModified("password")) {
			const salt = await genSalt(10);
			this.password = await hash(this.password, salt);
		}
		if (this.isNew && !this.id) {
			const lastItem = await User.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
		}
		next();
	} catch (err) {
		next(err);
	}
});

const User = model("User", userSchema, "users");

export default User;
