import { Schema, model } from "mongoose";

const couponCodeSchema = new Schema(
	{
		id: {
			unique: true,
			type: Number,
		},
		listType: {
			type: String,
			enum: ["space", "experience"],
		},
		code: { type: String, unique: true },
		type: {
			type: String,
			enum: ["amount", "percentage"],
		},
		currencyCode: String,
		value: Number,
		minAmount: Number,
		perUserLimit: Number,
		perListingLimit: Number,
		visibleOnPublic: {
			type: Boolean,
			default: true,
		},
		image: {
			src: String,
			uploadDir: {
				type: String,
				default: "coupon_codes/",
			},
			uploadDriver: {
				type: Number,
				default: 0,
			},
		},
		startDate: Date,
		endDate: Date,
		status: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

couponCodeSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await CouponCode.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const CouponCode = model("CouponCode", couponCodeSchema, "coupon_codes");

export default CouponCode;
