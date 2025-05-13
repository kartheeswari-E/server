import { gql } from "apollo-server-express";

const languageType = gql`
	type Language {
		id: Int
		code: String
		name: String
		isTranslatable: Boolean
		status: Boolean
	}

	input LanguageInput {
		code: String
		name: String
		isTranslatable: Boolean
		status: Boolean
	}
`;

export default languageType;
