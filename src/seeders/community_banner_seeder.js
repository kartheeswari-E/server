import CommunityBanner from "../data/models/community_banner.js";

const data = [
	{
		id: 1,
		type: "image",
		title: { en: "Meet Lynette" },
		description: { en: "Lynette is an adventurous spirit who loves exploring new places and meeting new people." },
		image: {
			src: "asian-man-camera-fashion-guy.jpg",
			uploadDir: "community_banners/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 2,
		type: "image",
		title: { en: "Meet Paige" },
		description: { en: "Paige is a creative soul with a passion for photography and capturing life's beautiful moments." },
		image: {
			src: "paige.jpg",
			uploadDir: "community_banners/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 3,
		type: "image",
		title: { en: "Meet Andrew" },
		description: { en: "Andrew is a tech enthusiast who enjoys sharing his knowledge and experiences with others." },
		image: {
			src: "man-male-nikon-camera.jpg",
			uploadDir: "community_banners/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
];

export default async () => {
	try {
		console.log("Running CommunityBanner Seeder");

		// Clear existing data
		await CommunityBanner.deleteMany({});

		// Insert new data
		for (const item of data) {
			const response = await CommunityBanner.create(item);
		}

		console.log("CommunityBanner Seeding completed successfully");
	} catch (error) {
		console.error("CommunityBanner Seeding failed:", error);
	}
};
