import { gql } from "apollo-server-express";

const couponCodeType = gql`
	type CouponCode {
		id: Int
		code: String
		type: String
		currencyCode: String
		value: Float
		amount: ConvertableAmount
		minAmount: ConvertableAmount
		perUserLimit: Int
		perListingLimit: Int
		visibleOnPublic: Boolean
		startDate: Date
		endDate: Date
		status: Boolean
		createdAt: DateTime
		updatedAt: DateTime
	}

	input CouponCodeInput {
		code: String
		type: String
		currencyCode: String
		value: Float
		minAmount: Float
		perUserLimit: Int
		perListingLimit: Int
		visibleOnPublic: Boolean
		startDate: Date
		endDate: Date
		status: Boolean
	}
`;

export default couponCodeType;
