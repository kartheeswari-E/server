import SpaceStyle from "../data/models/space_styles.js";

const data = [
	{
		id: 8,
		name: { en: "Whimsical" },
		description: { en: "A playful and imaginative style that incorporates vibrant colors and unique designs." },
		status: true, // "Active" mapped to true
	},
	{
		id: 7,
		name: { en: "Rustic" },
		description: { en: "A warm and cozy style that emphasizes natural materials and a connection to the outdoors." },
		status: true, // "Active" mapped to true
	},
	{
		id: 6,
		name: { en: "Raw" },
		description: { en: "An unrefined style that showcases raw materials and an industrial aesthetic." },
		status: true, // "Active" mapped to true
	},
	{
		id: 5,
		name: { en: "Modern" },
		description: { en: "A sleek and minimalist style characterized by clean lines and contemporary design." },
		status: true, // "Active" mapped to true
	},
	{
		id: 4,
		name: { en: "Luxurious" },
		description: { en: "An opulent style that features high-end materials and sophisticated design elements." },
		status: true, // "Active" mapped to true
	},
	{
		id: 3,
		name: { en: "Intimate" },
		description: { en: "A cozy and inviting style that creates a sense of closeness and warmth." },
		status: true, // "Active" mapped to true
	},
	{
		id: 2,
		name: { en: "Industrial" },
		description: { en: "A style that embraces raw materials and an urban feel, often featuring exposed brick and metal." },
		status: true, // "Active" mapped to true
	},
	{
		id: 1,
		name: { en: "Classic" },
		description: { en: "A timeless style that incorporates traditional elements and elegant design." },
		status: true, // "Active" mapped to true
	},
];

export default async () => {
	try {
		console.log("Running SpaceStyle Seeder");

		// Clear existing data
		await SpaceStyle.deleteMany({});

		// Insert new data
		for (const item of data) {
			const response = await SpaceStyle.create(item);
		}

		console.log("SpaceStyle Seeding completed successfully");
	} catch (error) {
		console.error("SpaceStyle Seeding failed:", error);
	}
};
