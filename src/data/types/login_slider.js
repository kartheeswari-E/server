import { gql } from "apollo-server-express";

const loginSliderType = gql`
	type LoginSlider {
		id: Int!
		type: String
		image: Image
		orderId: Int!
		status: Boolean
		createdAt: DateTime
		updatedAt: DateTime
	}

	input LoginSliderInput {
		type: String
		image: Upload
		orderId: Int
		status: Boolean
	}
`;

export default loginSliderType;
