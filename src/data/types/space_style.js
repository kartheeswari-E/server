import { gql } from "apollo-server-express";

const spaceStyleTypes = gql`
	type SpaceStyle {
		id: Int
		description: TranslatableString
		name: TranslatableString
		status: Boolean
	}

	input SpaceStyleInput {
		description: JSON
		name: JSON
		status: Boolean
	}
`;

export default spaceStyleTypes;
