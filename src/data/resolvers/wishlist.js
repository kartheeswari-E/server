import { gql } from "apollo-server-express";

import Wishlist from "../models/wishlist.js";
import Hotel from "../models/hotel.js";

export const wishlistTypeDef = gql`
	type Query {
		getWishlists: [Wishlist]
		getWishlistById(id: Int!): Wishlist
		getWishlistByUserId(id: Int!): [Wishlist]
	}
	type Mutation {
		addToWishlist(id: Int!, hotel_id: Int!): Boolean
		addWishlist(input: WishlistInput!): Wishlist
		updateWishlist(id: Int!, input: WishlistInput!): Wishlist
		deleteWishlist(id: Int!): String
		removeWishlist(userId: Int!, hotelId: Int!): String
	}
`;

const wishlistResolvers = {
	Query: {
		getWishlists: async () => {
			try {
				const wishlists = await Wishlist.find();
				return wishlists;
			} catch (error) {
				throw new Error("Failed to fetch wishlists");
			}
		},
		getWishlistById: async (_, { id }) => {
			try {
				const wishlist = await Wishlist.findOne({ id: id });
				return wishlist;
			} catch (error) {
				throw new Error("Failed to fetch wishlist by ID");
			}
		},
		getWishlistByUserId: async (_, { id }) => {
			try {
				const wishlist = await Wishlist.find({ userId: id });
				return wishlist;
			} catch (error) {
				throw new Error("Failed to fetch wishlist by ID");
			}
		},
	},
	Mutation: {
		addWishlist: async (_, { input }) => {
			const wishlist = {
				name: input.name,
				privacy: input.privacy,
				list: input.hotelId ? [input.hotelId] : [],
				userId: input.userId,
			};
			try {
				const newWishlist = new Wishlist(wishlist);

				const savedWishlist = await newWishlist.save();
				return savedWishlist;
			} catch (error) {
				throw new Error("Failed to add wishlist");
			}
		},
		updateWishlist: async (_, { id, input }) => {
			try {
				const updatedWishlist = await Wishlist.findOneAndUpdate({ id: id }, { $set: input }, { new: true });
				return updatedWishlist;
			} catch (error) {
				throw new Error("Failed to update wishlist");
			}
		},
		deleteWishlist: async (_, { id }) => {
			try {
				const res = await Wishlist.findOneAndDelete({ id: id });
				if (!res) {
					return "Given ID not found";
				}
				return "Wishlist deleted successfully";
			} catch (error) {
				throw new Error("Failed to delete wishlist");
			}
		},
		removeWishlist: async (_, { userId, hotelId }) => {
			try {
				const filter = { userId: parseInt(userId) }; // Assuming userId is stored as a number in the database
				const update = { $pull: { list: parseInt(hotelId) } }; // Assuming hotelId is stored as a number in the database

				const result = await Wishlist.updateMany(filter, update);

				if (result.matchedCount === 0) {
					return "Given userId not found";
				}

				if (result.modifiedCount === 0) {
					return "Hotel ID not found in any list";
				}

				return "Wishlist updated successfully";
			} catch (error) {
				throw new Error("Failed to update wishlist");
			}
		},
		addToWishlist: async (_, { id, hotel_id }) => {
			try {
				const wishlist = await Wishlist.findOne({ id: id });
				if (!wishlist) {
					throw new Error("Wishlist not found");
				}

				wishlist.list.push(hotel_id);

				await wishlist.save();

				return {
					success: true,
					message: "Saved to my wishlist",
				};
			} catch (error) {
				return {
					success: false,
					message: "Not Saved",
				};
			}
		},
	},
};

export default wishlistResolvers;
