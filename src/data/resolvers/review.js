import { gql } from "apollo-server-express";
import Review from "../models/review.js";
import Reservation from "../models/reservation.js";
import { getEndDate, getLastReserve } from "../../utils/payout_services.js";
import moment from "moment";
import emailManagementResolver from "./email_management.js";
import User from "../models/user.js";

// GraphQL Type Definitions
export const reviewTypeDef = gql`
	type Query {
		getReviews(filters: JSON): [Review]
		getReview(id: Int!): Review
	}

	type Mutation {
		createReview(input: ReviewInput!): Boolean
		updateReview(id: Int!, input: ReviewInput): Boolean
		deleteReview(id: Int!): Boolean
	}
`;

// Resolvers
const reviewQueryDef = {
	getReviews: async (_, { filters }, context) => {
		const defaultFilters = {};
		const reviews = await Review.find({ ...defaultFilters, ...filters })
			.populate("fromDetail")
			.populate("toDetail")
			.populate("reservationDetails")
			.populate("spaceDetails");

		function checkValue(value) {
			return Boolean(value?.privateReview && value?.publicReview);
		}

		const enhancedReviews = reviews.map(async (review) => {
			const reservationReviews = await Review.find({ reservationId: review.reservationId });
			const userReviewExists = reservationReviews.find((data) => data.userType === "user");
			const hostReviewExists = reservationReviews.find((data) => data.userType === "host");

			return {
				...review.toObject(),
				fromName: `${review.fromDetail?.firstName} ${review?.fromDetail?.lastName}`,
				toName: `${review.toDetail?.firstName} ${review?.toDetail?.lastName}`,
				fromImage: review.fromDetail?.image,
				toImage: review.toDetail?.image,
				reservationCode: review.reservationDetails?.code,
				spaceName: review.spaceDetails?.name?.get("en"),
				userCheck: checkValue(userReviewExists),
				hostCheck: checkValue(hostReviewExists),
				fromCreatedAt: review.fromDetail.createdAt,
				toCreatedAt: review.toDetail.createdAt,
			};
		});

		return enhancedReviews;
	},

	getReview: async (_, { id }, context) => {
		const defaultFilters = {};
		const review = await Review.findOne({ id, ...defaultFilters })
			.populate("fromDetail")
			.populate("toDetail")
			.populate("reservationDetails")
			.populate("spaceDetails");

		if (!review) {
			throw new Error("Review not found");
		}

		// Fetch all reviews for the same reservation
		const reservationReviews = await Review.find({
			reservationId: review.reservationId,
		});

		// Check if user reviews exist with both public and private content
		const userReviewExists = reservationReviews.some(
			(r) => r.userType === "user" && r.privateReview && r.publicReview && r.fromUser === review.fromUser,
		);

		// Check if host reviews exist with both public and private content
		const hostReviewExists = reservationReviews.some(
			(r) => r.userType === "host" && r.privateReview && r.publicReview && r.fromUser === review.fromUser,
		);

		return {
			...review.toObject(),
			fromName: `${review.fromDetail?.firstName} ${review?.fromDetail?.lastName}`,
			toName: `${review.toDetail?.firstName} ${review?.toDetail?.lastName}`,
			fromImage: review.fromDetail?.image,
			toImage: review.toDetail?.image,
			spaceName: review.spaceDetails?.name?.get("en"),
			reservationCode: review.reservationDetails?.code,
			userCheck: userReviewExists,
			hostCheck: hostReviewExists,
			fromCreatedAt: review.fromDetail.createdAt,
			toCreatedAt: review.toDetail.createdAt,
		};
	},
};

const reviewMutationDef = {
	createReview: async (_, { input }, context) => {
		const reservation = await Reservation.findOne({ id: input.reservationId });
		const reviewDateInfo = await getLastReserve(reservation.reserveData);

		// Combine date and endTime to form the complete reviewDate
		const reviewDate = new Date(reviewDateInfo.date);
		console.log("reviewDate", reviewDate);
		// Calculate the expireDate as 14 days after reviewDate
		const expireDate = new Date(reviewDate);
		expireDate.setDate(expireDate.getDate() + 14);

		const reviewData = {
			...input,
			reviewDate: reviewDate.toISOString(),
			expireDate: expireDate.toISOString(),
		};

		const review = new Review(reviewData);
		try {
			await review.save();
			return true;
		} catch (e) {
			console.error("Error saving review:", e);
			return false;
		}
	},
	updateReview: async (_, { id, input }, context) => {
		const review = await Review.findOne({ id });
		const otherReview = await Review.findOne({
			reservationId: review.reservationId,
			id: { $ne: id }, // Ensure the id is not the same as the current review's id
		});
		const toUser = await User.findOne({ id: review.toUser });
		const fromUser = await User.findOne({ id: review.fromUser });
		if (!review) {
			throw new Error("Review not found");
		}
		Object.assign(review, input);
		try {
			await review.save();

			let host = process.env.APP_URL;
			const sendMail = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
				templateId: 26,
				recipient: toUser.email,
				data: {
					user_image: host + "/images/" + (fromUser.image.uploadDir ? fromUser.image.uploadDir : "") + fromUser.image.src,
					member_since: moment(fromUser?.createdAt).format("YYYY"),
					user_name: fromUser.firstName,
					public: review.publicReview,
					private: review.privateReview,
					protected_image: host + "/images/email/protected_screen.png",
					show: otherReview.privateReview ? true : false,
				},
				subject: `Find out what ${fromUser.firstName} wrote about you`,
			});

			return true;
		} catch (e) {
			return false;
		}
	},

	deleteReview: async (_, { id }, context) => {
		if (!context.user || context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const result = await Review.findOneAndDelete({ id });
		return result !== null;
	},
};

const reviewResolver = {
	Query: reviewQueryDef,
	Mutation: reviewMutationDef,
};

export default reviewResolver;
