import { gql } from "apollo-server-express";
import uploadFile from "../../utils/file_uploader.js";
import CommunityBanner from "../models/community_banner.js";

export const communityBannerTypeDef = gql`
	type Query {
		getCommunityBanners(filters: JSON): [CommunityBanner]
		getCommunityBanner(id: Int): CommunityBanner
	}
	type Mutation {
		createCommunityBanner(input: CommunityBannerInput): Boolean
		updateCommunityBanner(id: Int!, input: CommunityBannerInput): Boolean
		deleteCommunityBanner(id: Int!): Boolean
	}
`;

const communityBannerQueryDef = {
	getCommunityBanners: async (_, { filters }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		const banners = await CommunityBanner.find({ ...filters, ...defaultFilters });
		return banners;
	},
	getCommunityBanner: async (_, { id }, context) => {
		var defaultFilters = {};
		if (context.user && context.user.type !== "admin") {
			defaultFilters["status"] = 1;
		}
		return await CommunityBanner.findOne({ id, ...defaultFilters });
	},
};

const communityBannerMutationDef = {
	createCommunityBanner: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		var mergeInput = {};
		if (input["image"] != null) {
			let options = {
				uploadPath: "community_banners",
				namePrefix: "banner_",
				addTime: true,
			};
			try {
				const result = await uploadFile(input["image"], options);
				mergeInput["image"] = {
					src: result.name,
					uploadDriver: result.uploadDriver,
					uploadDir: result.uploadDir,
				};
			} catch (e) {}
		}

		const data = { ...input, ...mergeInput };
		const banner = new CommunityBanner(data);

		try {
			await banner.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateCommunityBanner: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}

		const banner = await CommunityBanner.findOne({ id });

		if (!banner) {
			throw new Error("banner not found");
		}
		var mergeInput = { image: banner.image };
		if (input["image"] != null) {
			let options = {
				uploadPath: "community_banners/",
				namePrefix: "banner_",
				addTime: true,
			};
			try {
				const result = await uploadFile(input["image"], options);
				mergeInput["image"] = {
					src: result.name,
					uploadDriver: result.uploadDriver,
					uploadDir: result.uploadDir,
				};
			} catch (e) {
				mergeInput["image"] = banner.image;
			}
		}
		const data = { ...input, ...mergeInput };
		Object.assign(banner, data);
		try {
			await banner.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteCommunityBanner: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const result = await CommunityBanner.findOneAndDelete({ id });
		return result !== null; // Returns true if a document was deleted, false otherwise
	},
};

const communityBannerResolver = {
	Query: communityBannerQueryDef,
	Mutation: communityBannerMutationDef,
};

export default communityBannerResolver;
