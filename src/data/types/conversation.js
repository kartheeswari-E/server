import { gql } from "apollo-server-express";

const conversationTypes = gql`
	enum MessageType {
		booking_discuss
		booking_accepted
		booking_requested
		booking_pre_accepted
		booking_declined
		booking_expired
		guest_cancel_request
		guest_cancel_booking
		host_cancel_booking
		resubmit_room
		resubmit_id
		contact_request_sent
		request_pre_approved
		special_offer
		admin_cancel_booking
		dispute_discuss
		guest_request_dispute
		host_request_dispute
		guest_accept_dispute
		host_accept_dispute
		special_offer_expired
		special_offer_removed
	}

	input ConversationInput {
		spaceId: Int
		reservationId: Int
		userId: Int
		hostId: Int
		lastMessage: String
		guestArchive: Boolean
		hostArchive: Boolean
		guestStar: Boolean
		hostStar: Boolean
		guestRead: Boolean
		hostRead: Boolean
		specialOfferId: Int
		guestBlocked: Boolean
		hostBlocked: Boolean
		messages: [MessageInput]
	}

	input MessageInput {
		userFrom: Int!
		userTo: Int!
		messageType: MessageType!
		message: String!
		specialOfferId: Int
	}

	type Message {
		userFrom: Int
		userTo: Int
		messageType: MessageType
		message: String
		read: Boolean
		specialOfferId: Int
	}

	type Conversation {
		id: Int!
		spaceId: Int
		reservationId: Int
		userId: Int
		userImage: Image
		hostImage: Image
		hostId: Int
		lastMessage: String
		guestArchive: Boolean
		hostArchive: Boolean
		guestStar: Boolean
		hostStar: Boolean
		guestRead: Boolean
		hostRead: Boolean
		specialOfferId: Int
		guestBlocked: Boolean
		hostBlocked: Boolean
		messages: [Message]
	}
	type UserConversation {
		id: Int
		name: String
		image: Image
	}
	type MessageSend {
		userFrom: UserConversation
		userTo: UserConversation
		messageType: MessageType
		message: String
		read: Boolean
		specialOfferId: Int
		specialOffer: SpecialOffer
		createdAt: DateTime
	}
	type ConversationSend {
		id: Int!
		spaceId: Int
		spaceAddress: SpaceAddress
		reservationId: Int
		priceTotal: String
		hostPayout: Float
		guestRefund: Float
		reservationStatus: String
		userId: Int
		hostId: Int
		userName: String
		hostName: String
		userImage: Image
		hostImage: Image
		hostCreated: Date
		lastMessage: String
		guestArchive: Boolean
		hostArchive: Boolean
		guestStar: Boolean
		hostStar: Boolean
		guestRead: Boolean
		hostRead: Boolean
		specialOfferId: Int
		guestBlocked: Boolean
		hostBlocked: Boolean
		messages: [MessageSend]
	}

	type ConversationByUser {
		conversations: [ConversationSend]
		totalPages: Int
	}
`;

export default conversationTypes;
