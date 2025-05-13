import { Schema, model } from "mongoose";

const payoutMethodSchema = new Schema(
	{
		id: {
			type: Number,

			unique: true,
		},
		payoutId: {
			type: String,
			required: true,
			unique: true,
		},

		userId: {
			type: Number,
			ref: "User",
			required: true,
		},

		methodType: {
			type: String,
		},

		methodTypeText: {
			type: String,
		},

		currencyCode: {
			type: String,
		},

		isDefault: {
			type: Boolean,
			default: false,
		},

		countryCode: {
			type: String,
		},

		status: {
			type: Number,
		},

		statusText: {
			type: String,
		},
	},
	{ timestamps: true },
);

payoutMethodSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await PayoutMethod.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const PayoutMethod = model("PayoutMethod", payoutMethodSchema, "payout_methods");

export default PayoutMethod;
