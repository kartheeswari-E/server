import { Schema, model } from "mongoose";

const communityBannerSchema = new Schema(
	{
		id: {
			unique: true,
			type: Number,
		},
		type: {
			type: String,
			enum: ["image", "video"],
			default: "image",
		},
		title: { type: Map, of: String },
		description: { type: Map, of: String },
		image: {
			src: String,
			uploadDir: {
				type: String,
				default: "community_banners/",
			},
			uploadDriver: {
				type: Number,
				default: 0,
			},
		},
		status: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

communityBannerSchema.pre("save", async function (next) {
	try {
		if (this.isNew && !this.id) {
			const lastItem = await CommunityBanner.findOne({}, {}, { sort: { id: -1 } });
			this.id = lastItem ? lastItem.id + 1 : 1;
			next();
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
});

const CommunityBanner = model("CommunityBanner", communityBannerSchema, "community_banners");

export default CommunityBanner;
