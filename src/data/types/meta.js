import { gql } from "apollo-server-express";

const metaTypeDef = gql`
	type Meta {
		id: Int!
		routeName: String
		displayName: String
		title: TranslatableString
		description: TranslatableString
		keywords: TranslatableString
	}

	input MetaInput {
		title: JSON
		description: JSON
		keywords: JSON
	}
`;

export default metaTypeDef;
