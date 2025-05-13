import { gql } from "apollo-server-express";

const wishlistType = gql`
	type WishlistList {
		hotelId: Int
	}

	type Wishlist {
		id: Int
		userId: Int
		name: String
		privacy: Boolean
		lists: [WishlistList]
		createdAt: DateTime
		updatedAt: DateTime
	}

	input WishlistInput {
		userId: Int
		name: String
		privacy: Boolean
	}
`;

export default wishlistType;
