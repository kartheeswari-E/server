import { gql } from "apollo-server-express";

const featuredCityType = gql`
	type FeaturedCity {
		id: Int!
		cityName: String
		placeId: String
		displayName: TranslatableString
		latitude: Float
		longitude: Float
		orderId: Int
		image: Image
		status: Boolean
		createdAt: DateTime
		updatedAt: DateTime
	}

	input FeaturedCityInput {
		cityName: String
		placeId: String
		displayName: JSON
		latitude: Float
		longitude: Float
		orderId: Int
		image: Upload
		status: Boolean
	}
`;

export default featuredCityType;
