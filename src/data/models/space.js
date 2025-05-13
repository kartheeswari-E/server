// /models/Space.js

import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

// Address Schema
const spaceAddressSchema = new Schema({
	addressLine1: String,
	addressLine2: String,
	city: String,
	state: String,
	countryCode: String,
	postalCode: String,
	latitude: Number,
	longitude: Number,
	guidance: String,
});

// Photo Schema
const spacePhotoSchema = new Schema({
	id: Number,
	image: {
		src: String,
		uploadDir: {
			type: String,
			default: "spaces/",
		},
		uploadDriver: {
			type: Number,
			default: 0,
		},
	},
});

const activityDiscount = new Schema({
	period: String,
	percentage: String,
});
const spaceActivities = new Schema({
	type: Number,
	currencyCode: String,
	minHours: String,
	maxHours: String,
	maxGuest: Number,
	pricePerHour: Number,
	cleaningFee: Number,
	securityFee: Number,
	stayDiscount: [activityDiscount],
	earlyDiscount: [activityDiscount],
	status: { type: Boolean, default: false },
});

// Main Space Schema
const spaceSchema = new Schema(
	{
		id: { type: Number, unique: true },
		userId: Number,
		name: { type: Map, of: String },
		description: { type: Map, of: String },
		maxSpace: {
			type: Number,
		},
		spaceType: Number,
		roomCount: { type: Number, default: 0 },
		restRoomCount: { type: Number, default: 0 },
		wifiName: String,
		wifiPwd: String,
		starRating: Number,
		contactEmail: String,
		contactNumber: String,
		noticeDays: Number,
		refundDays: Number,
		refundPercentage: Number,
		spacePolicy: Object,
		amenities: [Number],
		spaceRules: [Number],
		guestAccesses: [Number],
		specialFeatures: [Number],
		otherGuestAccesses: String,
		services: [Number],
		otherServices: String,
		spaceAddress: spaceAddressSchema,
		spacePhotos: [spacePhotoSchema],
		spaceVideo: String,
		spaceStyles: [Number],
		activity: [spaceActivities],
		availability: {
			type: {
				sunday: {
					openStatus: Boolean,
					openTime: String,
					closeTime: String,
				},
				monday: {
					openStatus: Boolean,
					openTime: String,
					closeTime: String,
				},
				tuesday: {
					openStatus: Boolean,
					openTime: String,
					closeTime: String,
				},
				wednesday: {
					openStatus: Boolean,
					openTime: String,
					closeTime: String,
				},
				thursday: {
					openStatus: Boolean,
					openTime: String,
					closeTime: String,
				},
				friday: {
					openStatus: Boolean,
					openTime: String,
					closeTime: String,
				},
				saturday: {
					openStatus: Boolean,
					openTime: String,
					closeTime: String,
				},
			},
		},
		bookingType: {
			type: String,
			enum: ["request", "instant"],
			default: "request",
		},
		cancellationPolicy: {
			type: String,
			enum: ["1", "2", "3", "4"],
			default: "1",
		},
		isRecommended: Boolean,
		status: { type: String, enum: ["inProgress", "pending", "listed", "unListed"], default: "pending" },
		adminStatus: { type: String, enum: ["pending", "approved", "resubmit"] },
		resubmitReason: String,
		adminCommission: Number,
		rating: Number,
		totalRating: Number,
		deletedAt: Date,
	},
	{ timestamps: true },
);

spaceSchema.virtual("spaceReviews", {
	ref: "Review",
	localField: "id",
	foreignField: "spaceId",
	justOne: false,
});

spaceSchema.virtual("userDetail", {
	ref: "User",
	localField: "userId",
	foreignField: "id",
	justOne: true,
});

spaceSchema.virtual("spaceTypeDetail", {
	ref: "SpaceType",
	localField: "spaceType",
	foreignField: "id",
	justOne: true,
});

spaceSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await Space.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const Space = model("Space", spaceSchema, "spaces");

export default Space;
