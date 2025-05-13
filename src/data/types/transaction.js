import { gql } from "apollo-server-express";

const transactionType = gql`
	type Transaction {
		id: Int
		userId: Int
		reservationId: Int
		listType: String
		type: String
		description: String
		currencyCode: String
		amount: Float
		transactionId: String
		paymentMethod: String
		status: String
		createdAt: DateTime
		updatedAt: DateTime
	}

	input TransactionInput {
		userId: Int
		reservationId: Int
		listType: String
		type: String
		description: String
		currencyCode: String
		amount: Float
		transactionId: String
		paymentMethod: String
		status: String
	}
`;

export default transactionType;
