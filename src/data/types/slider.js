import { gql } from "apollo-server-express";

const sliderType = gql`
	type Slider {
		id: Int
		title: TranslatableString
		description: TranslatableString
		image: Image
		orderId: Int
		status: Boolean
		createdAt: DateTime
		updatedAt: DateTime
	}

	input SliderInput {
		type: String
		title: JSON
		description: JSON
		image: Upload
		orderId: Int
		status: Boolean
	}
`;

export default sliderType;
