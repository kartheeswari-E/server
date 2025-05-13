import { gql } from "apollo-server-express";

const activityTypes = gql`
	type Activity {
		id: Int
		name: TranslatableString
		description: TranslatableString
		activityType: Int
		image: Image
		status: Boolean
		isPopular: Boolean
		createdAt: DateTime
		updatedAt: DateTime
	}

	input ActivityInput {
		name: JSON
		description: JSON
		activityType: Int
		image: Upload
		status: Boolean
		isPopular: Boolean
	}
`;

export default activityTypes;
