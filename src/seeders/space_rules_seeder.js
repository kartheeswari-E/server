import SpaceRule from "../data/models/space_rule.js";

const data = [
	{
		id: 1,
		name: { en: "No Open Flame" },
		description: {
			en: "Open flames can pose a significant fire hazard. Please refrain from using candles, lighters, or any other source of open flame.",
		},
		image: {
			src: "/space_rules/no_open_fire.png",
			uploadDir: "space_rules/",
			uploadDriver: 0,
		},
		status: true,
	},
	{
		id: 2,
		name: { en: "No Smoking" },
		description: { en: "Smoking is not permitted in this area to ensure a healthy environment for everyone." },
		image: {
			src: "/space_rules/no_smoking.png",
			uploadDir: "space_rules/",
			uploadDriver: 0,
		},
		status: true,
	},
	{
		id: 3,
		name: { en: "No Cooking" },
		description: { en: "Cooking is not allowed in this space to prevent mess and potential fire hazards." },
		image: {
			src: "/space_rules/no_cooking.png",
			uploadDir: "space_rules/",
			uploadDriver: 0,
		},
		status: true,
	},
	{
		id: 4,
		name: { en: "No Loud Music" },
		description: { en: "To maintain a peaceful atmosphere, please keep music and noise to a minimum." },
		image: {
			src: "/space_rules/no_loud_music.png",
			uploadDir: "space_rules/",
			uploadDriver: 0,
		},
		status: true,
	},
	{
		id: 5,
		name: { en: "No Dancing" },
		description: { en: "Dancing is not allowed in this area to ensure safety and comfort for all guests." },
		image: {
			src: "/space_rules/no_dancing.png",
			uploadDir: "space_rules/",
			uploadDriver: 0,
		},
		status: true,
	},
	{
		id: 6,
		name: { en: "No Late Night" },
		description: { en: "To respect the peace of the surrounding community, all activities must conclude by a specified time." },
		image: {
			src: "/space_rules/no_party.png",
			uploadDir: "space_rules/",
			uploadDriver: 0,
		},
		status: true,
	},
	{
		id: 7,
		name: { en: "No Teenagers" },
		description: { en: "This space is designated for adults only. Please ensure that teenagers are not present." },
		image: {
			src: "/space_rules/kids_not_allowed.png",
			uploadDir: "space_rules/",
			uploadDriver: 0,
		},
		status: true,
	},
];

export default async () => {
	try {
		console.log("Running SpaceRule Seeder");

		// Clear existing data
		await SpaceRule.deleteMany({});

		// Insert new data
		for (const item of data) {
			const response = await SpaceRule.create(item);
		}

		console.log("SpaceRule Seeding completed successfully");
	} catch (error) {
		console.error("SpaceRule Seeding failed:", error);
	}
};
