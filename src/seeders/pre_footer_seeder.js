import PreFooter from "../data/models/pre_footer.js";

const data = [
	{
		id: 1,
		title: { en: "Find the perfect space" },
		description: { en: "Discover a variety of spaces tailored to your needs, whether for work, events, or relaxation." },
		image: {
			src: "customer_support.png",
			uploadDir: "pre_footers/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 2,
		title: { en: "Book it with ease" },
		description: { en: "Experience a seamless booking process that saves you time and effort, so you can focus on what matters." },
		image: {
			src: "host_guarantee.png",
			uploadDir: "pre_footers/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 3,
		title: { en: "Meet, make or create" },
		description: { en: "Connect with others and unleash your creativity in spaces designed for collaboration and innovation." },
		image: {
			src: "verified_id.png",
			uploadDir: "pre_footers/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
];
export default async () => {
	try {
		console.log("Running PreFooter Seeder");

		// Clear existing data
		await PreFooter.deleteMany({});

		// Insert new data
		for (const item of data) {
			const response = await PreFooter.create(item);
			console.log(`Inserted PreFooter with ID: ${response.id}`);
		}

		console.log("PreFooter Seeding completed successfully");
	} catch (error) {
		console.error("PreFooter Seeding failed:", error);
	}
};
