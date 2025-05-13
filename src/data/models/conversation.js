import { Schema, model } from "mongoose";

const messageSchema = new Schema(
	{
		userFrom: Number,
		userTo: Number,
		messageType: {
			type: String,
			enum: [
				"booking_discuss",
				"booking_accepted",
				"booking_requested",
				"booking_pre_accepted",
				"booking_declined",
				"booking_expired",
				"guest_cancel_request",
				"guest_cancel_booking",
				"host_cancel_booking",
				"resubmit_room",
				"resubmit_id",
				"contact_request_sent",
				"request_pre_approved",
				"special_offer",
				"admin_cancel_booking",
				"dispute_discuss",
				"guest_request_dispute",
				"host_request_dispute",
				"guest_accept_dispute",
				"host_accept_dispute",
				"special_offer_expired",
				"special_offer_removed",
			],
		},
		message: String,
		read: { type: Boolean, default: false },
		specialOfferId: Number,
	},
	{ timestamps: true },
);

const conversationSchema = new Schema(
	{
		id: Number,
		spaceId: Number,
		reservationId: Number,
		userId: Number,
		hostId: Number,
		lastMessage: String,
		guestArchive: { type: Boolean, default: false },
		hostArchive: { type: Boolean, default: false },
		guestStar: { type: Boolean, default: false },
		hostStar: { type: Boolean, default: false },
		guestRead: { type: Boolean, default: false },
		hostRead: { type: Boolean, default: false },
		specialOfferId: Number,
		guestBlocked: { type: Boolean, default: false },
		hostBlocked: { type: Boolean, default: false },
		messages: [messageSchema],
	},
	{ timestamps: true },
);

conversationSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await Conversation.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const Conversation = model("Conversation", conversationSchema, "conversations");

export default Conversation;
