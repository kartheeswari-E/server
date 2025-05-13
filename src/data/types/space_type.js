import { gql } from "apollo-server-express";

const spaceTypeTypes = gql`
	type SpaceType {
		id: Int
		name: TranslatableString
		image: Image
		status: Boolean
		createdAt: DateTime
		updatedAt: DateTime
	}

	input SpaceTypeInput {
		name: JSON
		image: Upload
		status: Boolean
	}
`;

export default spaceTypeTypes;
