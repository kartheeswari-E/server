import { gql } from "apollo-server-express";

const specialFeatureTypes = gql`
	type SpecialFeature {
		id: Int
		description: TranslatableString
		name: TranslatableString
		status: Boolean
	}

	input SpecialFeatureInput {
		description: JSON
		name: JSON
		status: Boolean
	}
`;

export default specialFeatureTypes;
