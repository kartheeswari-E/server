import { gql } from "apollo-server-express";

const staticPageType = gql`
	type StaticPage {
		id: Int
		slug: String
		name: TranslatableString
		content: TranslatableString
		inFooter: Boolean
		underSection: Int
		mustAgree: Boolean
		status: Boolean
		createdAt: DateTime
		updatedAt: DateTime
	}

	input StaticPageInput {
		slug: String
		name: JSON
		content: JSON
		inFooter: Boolean
		underSection: Int
		mustAgree: Boolean
		status: Boolean
	}
`;

export default staticPageType;
