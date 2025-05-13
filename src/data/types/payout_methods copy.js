import { gql } from "apollo-server-express";

const payoutMethodTypeDef = gql`
	type PayoutMethod {
		id: Int
		payoutId: String
		userId: Int
		methodType: String
		methodTypeText: String
		currencyCode: String
		isDefault: Boolean
		countryCode: String
		holderName: String
		bankName: String
		bankLocation: String
		routingNumber: String
		bankCode: String
		status: Boolean
		statusText: String
		createdAt: String
		updatedAt: String
	}

	type StripeConnectResponse {
		authUrl: String!
	}

	type StripeCallbackResponse {
		stripeAccountId: String!
	}
`;

export default payoutMethodTypeDef;
