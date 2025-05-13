import { gql } from "apollo-server-express";

const helpType = gql`
	type Help {
		id: Int!
		slug: String
		title: TranslatableString
		description: TranslatableString
		categoryType: Int
		category: Int
		status: Boolean
		helps: [NestedHelp]
		createdAt: String
		updatedAt: String
	}

	type NestedHelp {
		id: Int
		slug: String
		title: TranslatableString
		content: TranslatableString
		tags: String
		isRecommended: Boolean
		status: Boolean
	}

	input NestedHelpInput {
		slug: String
		title: JSON
		content: JSON
		tags: String
		isRecommended: Boolean!
		status: Boolean
	}

	input HelpInput {
		title: JSON
		slug: String
		description: JSON
		categoryType: Int
		category: Int
		status: Boolean
	}
`;

export default helpType;
