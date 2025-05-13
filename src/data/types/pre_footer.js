import { gql } from "apollo-server-express";

const preFooterType = gql`
	type PreFooter {
		id: Int
		title: TranslatableString
		description: TranslatableString
		image: Image
		status: Boolean
		createdAt: DateTime
		updatedAt: DateTime
	}

	input PreFooterInput {
		title: JSON
		description: JSON
		image: Upload
		status: Boolean
	}
`;

export default preFooterType;
