import { gql } from "apollo-server-express";

const serviceTypes = gql`
	type Service {
		id: Int
		description: TranslatableString
		name: TranslatableString
		status: Boolean
	}

	input ServiceInput {
		description: JSON
		name: JSON
		status: Boolean
	}
`;

export default serviceTypes;
