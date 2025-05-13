import { Schema, model } from "mongoose";

const spaceAvailabilitySchema = new Schema(
	{
		id: {
			unique: true,
			type: Number,
		},
		userId: Number,
		spaceId: Number,
		reservationId: Number,
		reserveDate: Date,
		reserveStartTime: Date,
		reserveEndTime: Date,
		available: {
			type: Boolean,
			default: 0,
		},
		currencyCode: String,
		price: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

spaceAvailabilitySchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await SpaceAvailability.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			this.createdAt = new Date();
			this.updatedAt = new Date();
			next();
		} else {
			this.updatedAt = new Date();
			next();
		}
	} catch (err) {
		next(err);
	}
});

spaceAvailabilitySchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await SpaceAvailability.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const SpaceAvailability = model("SpaceAvailability", spaceAvailabilitySchema, "space_availabilities");

export default SpaceAvailability;
