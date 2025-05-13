import { gql } from "apollo-server-express";

const activityTypeTypes = gql`
	type ActivityType {
		id: Int
		name: TranslatableString
		image: Image
		status: Boolean
		createdAt: DateTime
		updatedAt: DateTime
	}

	input ActivityTypeInput {
		name: JSON
		image: Upload
		status: Boolean
	}
`;

export default activityTypeTypes;
