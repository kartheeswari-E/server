import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const reservationSchema = new Schema(
	{
		id: {
			unique: true,
			type: Number,
		},
		code: {
			type: String,
			default: () => uuidv4().toUpperCase().replace(/-/g, "").slice(0, 8),
		},
		listType: { type: String, default: "space", enum: ["space", "experience"] },
		confirmationCode: String,
		userId: Number,
		hostId: Number,
		spaceId: Number,
		specialOfferId: Number,
		spaceType: Number,
		activityType: Number,
		activity: Number,
		guestCount: Number,
		reserveData: [
			{
				date: String,
				startTime: String,
				endTime: String,
			},
		],
		currencyCode: String,
		couponType: {
			type: String,
			enum: ["admin", "vendor"],
		},
		couponCode: String,
		couponPrice: Number,
		hourlyPrice: Number,
		totalHours: Number,
		securityFee: Number,
		cleaningFee: Number,
		serviceFee: Number,
		subTotal: Number,
		discountType: String,
		appliedDiscount: Number,
		vendorFee: Number,
		total: Number,
		paymentCurrency: String,
		transactionId: String,
		payout: {
			currencyCode: String,
			amount: Number,
			status: {
				type: String,
				enum: ["upcoming", "pending", "processing", "completed"],
			},
			transactionId: String,
		},
		refund: {
			status: {
				type: String,
				enum: ["upcoming", "pending", "processing", "completed"],
			},
			amount: Number,
			transactionId: String,
		},
		penalty: {
			isEnabled: Boolean,
			amount: Number,
			limit: Number,
			days: String,
			before: Number,
			after: Number,
		},
		paymentMethod: {
			type: String,
			enum: ["stripe", "bank_transfer", "pay_at_hotel"],
		},
		cancellationPolicyData: String,
		status: {
			type: String,
			enum: ["pending", "pre_accepted", "declined", "accepted", "cancelled", "completed", "no_show"],
			default: "pending",
		},
		expiredBy: {
			type: String,
			enum: ["user", "vendor"],
		},
		isNotAvailable: {
			type: Boolean,
			default: false,
		},
		cancelledBy: {
			type: String,
			enum: ["user", "vendor"],
		},
		cancelReason: String,
		cancelledAt: Date,
		acceptedAt: Date,
		guestDetails: String,
	},
	{ timestamps: true },
);

// Virtuals
reservationSchema.virtual("userDetails", {
	ref: "User", // The model to use
	localField: "userId", // Field in the reservation schema
	foreignField: "id", // Field in the User schema
	justOne: true, // One-to-one relationship
});

reservationSchema.virtual("hostDetails", {
	ref: "User",
	localField: "hostId",
	foreignField: "id",
	justOne: true,
});

reservationSchema.virtual("spaceDetails", {
	ref: "Space",
	localField: "spaceId",
	foreignField: "id",
	justOne: true,
});

reservationSchema.virtual("activityDetails", {
	ref: "Activity",
	localField: "activity",
	foreignField: "id",
	justOne: true,
});

reservationSchema.virtual("spaceTypeDetails", {
	ref: "SpaceType",
	localField: "spaceType",
	foreignField: "id",
	justOne: true,
});

reservationSchema.virtual("reservationReviews", {
	ref: "Review",
	localField: "id",
	foreignField: "reservationId",
	justOne: false,
});

reservationSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await Reservation.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 10001;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const Reservation = model("Reservation", reservationSchema, "reservations");

export default Reservation;
