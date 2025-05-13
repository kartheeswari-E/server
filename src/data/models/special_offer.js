import { Schema, model } from "mongoose";

const specialOfferSchema = new Schema(
	{
		id: Number,
		hostId: Number,
		userId: Number,
		reservationId: Number,
		subTotal: Number,
		hourlyPrice: Number,
		totalHours: Number,
		serviceFee: Number,
		vendorFee: Number,
		total: Number,
		status: {
			type: String,
			enum: ["active", "expired", "accepted", "declined", "removed"],
			default: "active",
		},
	},
	{ timestamps: true },
);

specialOfferSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await SpecialOffer.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
		}
		next();
	} catch (err) {
		next(err);
	}
});

const SpecialOffer = model("SpecialOffer", specialOfferSchema, "specialOffers");

export default SpecialOffer;
