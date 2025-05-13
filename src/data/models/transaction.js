import { Schema, model } from "mongoose";

import crypto from "crypto";

const transactionSchema = new Schema(
	{
		id: {
			unique: true,
			type: Number,
		},
		userId: Number,
		reservationId: Number,
		listType: { type: String, default: "space", enum: ["space", "experience"] },
		type: {
			type: String,
			enum: ["reservation", "payout", "refund"],
		},
		description: String,
		currencyCode: String,
		amount: Number,
		transactionId: String,
		paymentMethod: {
			type: String,
			enum: ["stripe", "paypal", "bank_transfer"],
		},
		status: {
			type: String,
			enum: ["pending", "completed", "cancelled"],
		},
	},
	{ timestamps: true },
);

transactionSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await Transaction.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
		}

		next();
	} catch (err) {
		next(err);
	}
});

const Transaction = model("Transaction", transactionSchema, "transactions");

export default Transaction;
