import { gql } from "apollo-server-express";

const communityBannerTypes = gql`
	type CommunityBanner {
		id: Int
		title: TranslatableString
		description: TranslatableString
		type: String
		image: Image
		orderId: Int
		status: Boolean
		createdAt: DateTime
		updatedAt: DateTime
	}

	input CommunityBannerInput {
		type: String
		title: JSON
		description: JSON
		image: Upload
		orderId: Int
		status: Boolean
	}
`;

export default communityBannerTypes;
