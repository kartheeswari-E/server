import { gql } from "apollo-server-express";

const payoutMethodTypes = gql`
	type PayoutMethod {
		id: Int
		payoutId: String
		userId: Int
		methodType: String
		methodTypeText: String
		currencyCode: String
		isDefault: Boolean
		countryCode: String
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

export default payoutMethodTypes;
