import { gql } from "apollo-server-express";

const countryType = gql`
	type Country {
		id: Int
		code: String
		name: String
		image: Image
		phoneCode: String
		currencyCode: String
		languageCode: String
		status: Boolean
	}

	input CountryInput {
		code: String
		name: String
		image: Upload
		phoneCode: String
		currencyCode: String
		languageCode: String
		status: Boolean
	}
`;

export default countryType;
