import { gql } from "apollo-server-express";

const propertyTypeType = gql`
	type PropertyType {
		id: Int
		name: TranslatableString
		description: TranslatableString
		image: Image
		status: Boolean
		createdAt: Date
		updatedAt: Date
	}

	input PropertyTypeInput {
		name: JSON
		description: JSON
		image: Upload
		status: Boolean
	}
`;

export default propertyTypeType;
