import { gql } from "apollo-server-express";

const amenityType = gql`
	type Amenity {
		id: Int
		name: TranslatableString
		description: TranslatableString
		image: Image
		status: Boolean
		createdAt: Date
		updatedAt: Date
	}

	input AmenityInput {
		name: JSON
		description: JSON
		image: Upload
		status: Boolean
	}
`;

export default amenityType;
