import { gql } from "apollo-server-express";

const currencyType = gql`
	type Currency {
		id: Int
		code: String
		name: String
		symbol: String
		rate: Float
		status: Boolean
	}

	input CurrencyInput {
		code: String
		name: String
		symbol: String
		rate: Float
		status: Boolean
	}
`;

export default currencyType;
