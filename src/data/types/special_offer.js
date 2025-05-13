import { gql } from "apollo-server-express";

export const specialOfferTypes = gql`
	type SpecialOffer {
		id: Int
		hostId: Int
		userId: Int
		reservationId: Int
		subTotal: Int
		hourlyPrice: Float
		totalHours: Int
		serviceFee: Float
		vendorFee: Float
		total: Float
		status: String
		createdAt: String
		updatedAt: String
	}

	input SpecialOfferInput {
		hostId: Int
		userId: Int
		reservationId: Int
		description: String
		validFrom: String
		validUntil: String
		subTotal: Float
	}
`;
