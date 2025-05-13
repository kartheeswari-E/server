import Service from "../data/models/service.js";

const data = [
	{
		id: 8,
		name: { en: "Photography" },
		description: { en: "Professional photography services for events and portraits." },
		status: true, // "Active" mapped to true
	},
	{
		id: 7,
		name: { en: "Trash Removal" },
		description: { en: "Efficient trash removal services to keep your space clean." },
		status: true, // "Active" mapped to true
	},
	{
		id: 6,
		name: { en: "Cleaning" },
		description: { en: "Comprehensive cleaning services for residential and commercial spaces." },
		status: true, // "Active" mapped to true
	},
	{
		id: 5,
		name: { en: "Security Crew" },
		description: { en: "Professional security services to ensure safety at your events." },
		status: true, // "Active" mapped to true
	},
	{
		id: 4,
		name: { en: "Event Manager" },
		description: { en: "Expert event management services to plan and execute your events." },
		status: true, // "Active" mapped to true
	},
	{
		id: 3,
		name: { en: "Furniture Rental" },
		description: { en: "Quality furniture rental services for all types of events." },
		status: true, // "Active" mapped to true
	},
	{
		id: 2,
		name: { en: "Lighting System" },
		description: { en: "Advanced lighting systems to enhance the atmosphere of your events." },
		status: true, // "Active" mapped to true
	},
	{
		id: 1,
		name: { en: "Food" },
		description: { en: "Delicious catering services with a variety of menu options." },
		status: true, // "Active" mapped to true
	},
];

export default async () => {
	try {
		console.log("Running Service Seeder");

		// Clear existing data
		await Service.deleteMany({});

		// Insert new data
		for (const item of data) {
			const response = await Service.create(item);
		}

		console.log("Service Seeding completed successfully");
	} catch (error) {
		console.error("Service Seeding failed:", error);
	}
};
