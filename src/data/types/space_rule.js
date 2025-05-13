import { gql } from "apollo-server-express";

const spaceRuleTypes = gql`
	type SpaceRule {
		id: Int
		description: TranslatableString
		name: TranslatableString
		image: Image
		status: Boolean
	}

	input SpaceRuleInput {
		description: JSON
		name: JSON
		image: Upload
		status: Boolean
	}
`;

export default spaceRuleTypes;
