import SpaceType from "../data/models/space_type.js";

const data = [
	{
		id: 1,
		name: { en: "Warehouse" },
		image: {
			src: "warehouse.png",
			uploadDir: "space_types/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 2,
		name: { en: "Storefront" },
		image: {
			src: "storefront.png",
			uploadDir: "space_types/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 3,
		name: { en: "Rooftop" },
		image: {
			src: "rooftop.png",
			uploadDir: "space_types/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 4,
		name: { en: "Outdoor Space" },
		image: {
			src: "outdoor_space.png",
			uploadDir: "space_types/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 5,
		name: { en: "Mansion/Estate" },
		image: {
			src: "estate.png",
			uploadDir: "space_types/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 6,
		name: { en: "Loft" },
		image: {
			src: "loft.png",
			uploadDir: "space_types/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 7,
		name: { en: "House" },
		image: {
			src: "house.png",
			uploadDir: "space_types/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 8,
		name: { en: "Garden" },
		image: {
			src: "garden.png",
			uploadDir: "space_types/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 9,
		name: { en: "Gallery" },
		image: {
			src: "gallery.png",
			uploadDir: "space_types/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 10,
		name: { en: "Event Space" },
		image: {
			src: "event_space.png",
			uploadDir: "space_types/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
];

export default async () => {
	try {
		console.log("Running SpaceType Seeder");

		// Clear existing data
		await SpaceType.deleteMany({});

		// Insert new data
		for (const item of data) {
			const response = await SpaceType.create(item);
		}

		console.log("SpaceType Seeding completed successfully");
	} catch (error) {
		console.error("SpaceType Seeding failed:", error);
	}
};
