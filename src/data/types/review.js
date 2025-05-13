import { gql } from "apollo-server-express";

const reviewType = gql`
	type Review {
		id: Int!
		fromUser: Int
		toUser: Int
		fromName: String
		toName: String
		fromImage: Image
		toImage: Image
		privateReview: String
		publicReview: String
		recommended: Boolean
		userCheck: Boolean
		hostCheck: Boolean
		userType: String
		spaceId: Int
		spaceName: String
		spaceType: String
		reservationId: Int
		reservationCode: String
		rating: Int
		fromCreatedAt: Date
		toCreatedAt: Date
		reviewDate: Date
		expireDate: Date
		status: Boolean
		createdAt: DateTime
		updatedAt: DateTime
	}

	input ReviewInput {
		fromUser: Int
		toUser: Int
		privateReview: String
		publicReview: String
		recommended: Boolean
		userType: String
		spaceId: Int
		spaceType: String
		reservationId: Int
		rating: Int
		reviewDate: String
		expireDate: String
		status: Boolean
	}
`;

export default reviewType;
