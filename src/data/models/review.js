import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
	{
		id: {
			unique: true,
			type: Number,
		},
		fromUser: Number,
		toUser: Number,
		privateReview: { type: String },
		publicReview: { type: String },
		recommended: { type: Boolean },
		userType: { type: String, enum: ["user", "host"] },
		spaceId: Number,
		spaceType: { type: String, enum: ["space", "experience"] },
		reservationId: Number,
		rating: { type: Number },
		reviewDate: String,
		expireDate: String,
		status: { type: Boolean },
	},
	{ timestamps: true },
);

reviewSchema.virtual("fromDetail", {
	ref: "User",
	localField: "fromUser",
	foreignField: "id",
	justOne: true,
});

reviewSchema.virtual("toDetail", {
	ref: "User",
	localField: "toUser",
	foreignField: "id",
	justOne: true,
});
reviewSchema.virtual("reservationDetails", {
	ref: "Reservation",
	localField: "reservationId",
	foreignField: "id",
	justOne: true,
});
reviewSchema.virtual("spaceDetails", {
	ref: "Space",
	localField: "spaceId",
	foreignField: "id",
	justOne: true,
});

reviewSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await Review.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const Review = model("Review", reviewSchema, "reviews");

export default Review;
