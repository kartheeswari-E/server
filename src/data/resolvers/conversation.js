import { gql } from "apollo-server-express";
import Conversation from "../models/conversation.js";
import { conversationAggregationPipeline } from "../../utils/pipeline_service.js";
import SpecialOffer from "../models/special_offer.js";
import User from "../models/user.js";
import db from "../../firebase.js";
import emailManagementResolver from "./email_management.js";
import Space from "../models/space.js";
import SpaceType from "../models/space_type.js";
import Reservation from "../models/reservation.js";
import moment from "moment";
import { getEarliestDate, getEarliestReserve, getEndDate, getLastReserve } from "../../utils/payout_services.js";
import { requestToBook, userConversation } from "../../services/email_management_service.js";

export const conversationTypeDef = gql`
	type Query {
		getConversations(filters: JSON): [ConversationSend]
		getConversationsByUser(
			userId: Int!
			type: String!
			archived: Boolean
			starred: Boolean
			filter: String
			page: Int
			limit: Int
		): ConversationByUser
		getConversationsByReservation(reservationId: Int!): ConversationSend
	}

	type Mutation {
		createConversation(input: ConversationInput!): Conversation
		updateConversation(id: Int!, input: ConversationInput!): Conversation
		addMessage(conversationId: Int!, messageInput: MessageInput!): Conversation
		markMessagesAsRead(conversationId: Int!, userId: Int!): Conversation
		toggleStarArchive(conversationId: Int!, userId: Int!, star: Boolean, archive: Boolean): Conversation
		removeSpecialOffers(conversationId: Int!): Boolean
	}
`;

const conversationQueryDef = {
	getConversations: async (_, { filters }, context) => {
		if (!context.user) {
			throw new Error("authorization_failed");
		}

		try {
			const pipeline = conversationAggregationPipeline(filters);
			const conversation = await Conversation.aggregate(pipeline);
			if (!(conversation[0].userId == context.user.userId || conversation[0].hostId == context.user.userId)) {
				throw new Error("authorization_failed");
			}
			return conversation || null;
		} catch (error) {
			throw new Error("Error fetching conversation");
		}
	},

	getConversationsByUser: async (_, { userId, type, archived, starred, filter, page, limit }, context) => {
		if (!context.user || userId !== context.user.userId) {
			throw new Error("authorization_failed");
		}
		let user = type == "user" ? "guest" : "host";

		try {
			const matchQuery = {
				...(type === "user" ? { userId } : { hostId: userId }),
				[`${user}Archive`]: false,
			};

			switch (filter) {
				case "starred":
					matchQuery[`${user}Star`] = true;
					break;
				case "unread":
					matchQuery[`${user}Read`] = false;
					break;
				case "reservations":
					matchQuery["messages.messageType"] = {
						$in: ["booking_accepted"],
					};
					break;
				case "pending":
					matchQuery["messages"] = {
						$elemMatch: {
							messageType: "booking_requested",
						},
					};
					matchQuery["messages.messageType"] = {
						$nin: ["booking_accepted", "booking_declined", "booking_expired"],
					};
					break;
				case "request":
					matchQuery["messages"] = {
						$elemMatch: {
							messageType: "booking_requested",
						},
					};
					matchQuery["messages.messageType"] = {
						$nin: ["booking_accepted", "booking_declined", "booking_pre_accepted", "booking_expired", "special_offer"],
					};
					break;
				case "archive":
					matchQuery[`${user}Archive`] = true;
					break;
				case "all":
				default:
					break;
			}

			if (archived !== undefined) matchQuery.guestArchive = archived;
			if (starred !== undefined) matchQuery.guestStar = starred;

			const pipeline = conversationAggregationPipeline(matchQuery);
			const totalCount = await Conversation.countDocuments(matchQuery);
			const totalPages = Math.ceil(totalCount / limit);
			pipeline.push({
				$sort: {
					[`${user}Star`]: -1, // Descending order for starred
					updatedAt: -1, // Descending order for most recent messages
				},
			});

			const skip = (page - 1) * limit;
			pipeline.push({ $skip: skip }, { $limit: limit });

			const conversations = await Conversation.aggregate(pipeline);

			return {
				conversations,
				totalPages,
			};
		} catch (error) {
			throw new Error("Error fetching conversations");
		}
	},

	getConversationsByReservation: async (_, { reservationId }, context) => {
		if (!context.user) {
			throw new Error("authorization_failed");
		}
		try {
			const pipeline = conversationAggregationPipeline({ reservationId });
			const conversation = await Conversation.aggregate(pipeline);
			if (context.user.type !== "admin" && !(conversation[0].userId == context.user.userId || conversation[0].hostId == context.user.userId)) {
				throw new Error("authorization_failed");
			}
			return conversation[0] || null;
		} catch (error) {
			throw new Error("Error fetching conversation by reservation ID");
		}
	},
};

const conversationMutationDef = {
	createConversation: async (_, { input }, context) => {
		if (!context.user) {
			throw new Error("Not authenticated");
		}
		if (context.user.type !== "user") {
			throw new Error("Not authenticated");
		}

		const user = await User.findOne({ email: context.user.email });
		if (!user) {
			throw new Error("User not found");
		}
		try {
			const newConversation = new Conversation(input);
			const conversation = await newConversation.save();
			await requestToBook(conversation.reservationId);

			return conversation;
		} catch (error) {
			throw new Error("Error creating conversation");
		}
	},

	updateConversation: async (_, { id, input }) => {
		try {
			return await Conversation.findOneAndUpdate(id, input, { new: true });
		} catch (error) {
			throw new Error("Error updating conversation");
		}
	},

	addMessage: async (_, { conversationId, messageInput }, context) => {
		if (!context.user) {
			throw new Error("Not authenticated");
		}

		const user = await User.findOne({ email: context.user.email });
		if (!user) {
			throw new Error("User not found");
		}

		const conversation = await Conversation.findOne({ id: conversationId });
		if (!(conversation.userId == context.user.userId || conversation.hostId == context.user.userId)) {
			throw new Error("authorization_failed");
		}

		let read;
		if (conversation.userId === context.user.userId) {
			read = { hostRead: false };
		} else if (conversation.hostId === context.user.userId) {
			read = { guestRead: false };
		}

		try {
			const updatedConversation = await Conversation.findOneAndUpdate(
				{ id: conversationId },
				{
					$push: { messages: messageInput },
					$set: {
						lastMessage: messageInput.message,
						...read,
					},
				},
				{ new: true },
			);

			const messageRef = db.ref(`messages/${conversationId}`);
			await messageRef.push({
				...messageInput,
				conversationId,
				timestamp: Date.now(),
			});

			await userConversation(
				updatedConversation.reservationId,
				conversation.userId === context.user.userId ? "user" : "host",
				messageInput.message,
			);
			return updatedConversation;
		} catch (error) {
			throw new Error("Error adding message");
		}
	},

	markMessagesAsRead: async (_, { conversationId, userId }, context) => {
		if (!context.user) {
			throw new Error("Not authenticated");
		}

		const user = await User.findOne({ email: context.user.email });
		if (!user) {
			throw new Error("User not found");
		}
		const conversation = await Conversation.findOne({ id: conversationId });
		if (!(conversation.userId == context.user.userId || conversation.hostId == context.user.userId)) {
			throw new Error("authorization_failed");
		}

		try {
			const conversation = await Conversation.findOne({ id: conversationId });
			if (!conversation) throw new Error("Conversation not found");

			conversation.messages.forEach((msg) => {
				if (msg.userTo === userId && !msg.read) {
					msg.read = true;
				}
			});

			let read;
			if (conversation.userId === context.user.userId) {
				read = "guestRead";
			} else if (conversation.hostId === context.user.userId) {
				read = "hostRead";
			}
			conversation[read] = true;

			return await conversation.save();
		} catch (error) {
			throw new Error("Error marking messages as read");
		}
	},
	toggleStarArchive: async (_, { conversationId, userId, star, archive }, context) => {
		if (!context.user) {
			throw new Error("Not authenticated");
		}

		const user = await User.findOne({ email: context.user.email });
		if (!user) {
			throw new Error("User not found");
		}

		const conversation = await Conversation.findOne({ id: conversationId });
		if (!(conversation.userId == context.user.userId || conversation.hostId == context.user.userId)) {
			throw new Error("authorization_failed");
		}
		try {
			const conversation = await Conversation.findOne({ id: conversationId });
			if (!conversation) throw new Error("Conversation not found");

			if (typeof star === "boolean") {
				if (conversation.userId === userId) conversation.guestStar = star;
				if (conversation.hostId === userId) conversation.hostStar = star;
			}

			if (typeof archive === "boolean") {
				if (conversation.userId === userId) conversation.guestArchive = archive;
				if (conversation.hostId === userId) conversation.hostArchive = archive;
			}

			return await conversation.save();
		} catch (error) {
			throw new Error("Error updating star/archive status");
		}
	},
	removeSpecialOffers: async (_, { conversationId }, context) => {
		if (!context.user) {
			throw new Error("Not authenticated");
		}

		const user = await User.findOne({ email: context.user.email });
		if (!user) {
			throw new Error("User not found");
		}
		const conversation = await Conversation.findOne({ id: conversationId });
		if (!(conversation.userId == context.user.userId || conversation.hostId == context.user.userId)) {
			throw new Error("authorization_failed");
		}

		try {
			const conversation = await Conversation.findOne({ id: conversationId });
			if (!conversation) {
				throw new Error("Conversation not found");
			}

			const filteredMessages = conversation.messages.filter((msg) => msg.messageType !== "special_offer");

			conversation.messages = filteredMessages;
			await conversation.save();

			const messageInput = {
				userFrom: conversation.hostId,
				userTo: conversation.userId,
				messageType: "special_offer_removed",
				message: "",
				specialOfferId: "",
			};
			await SpecialOffer.deleteMany({ reservationId: conversation.reservationId });
			await Conversation.findOneAndUpdate(
				{ id: conversationId },
				{
					$push: { messages: messageInput },
					$set: { lastMessage: messageInput.message },
				},
				{ new: true },
			);

			return true;
		} catch (error) {
			throw new Error("Error removing special offers");
		}
	},
};

const conversationResolver = {
	Query: conversationQueryDef,
	Mutation: conversationMutationDef,
};

export default conversationResolver;
