import Amenity from "../data/models/amenity.js";

const data = [
	{
		id: 1,
		name: { en: "TV" },
		description: { en: "A Smart TV with streaming capabilities." },
		image: {
			src: "Smart-TV_Wifi.png",
			uploadDir: "amenities/",
			uploadDriver: 0,
		},
		status: true,
	},
	{
		id: 2,
		name: { en: "Air Conditioning" },
		description: { en: "Cooling system to maintain a comfortable temperature." },
		image: {
			src: "air-conditioner.png",
			uploadDir: "amenities/",
			uploadDriver: 0,
		},
		status: true,
	},
	{
		id: 3,
		name: { en: "Wireless Internet" },
		description: { en: "High-speed wireless internet access." },
		image: {
			src: "wifi.png",
			uploadDir: "amenities/",
			uploadDriver: 0,
		},
		status: true,
	},
	{
		id: 4,
		name: { en: "Tables" },
		description: { en: "Various tables available for work or dining." },
		image: {
			src: "tables.png",
			uploadDir: "amenities/",
			uploadDriver: 0,
		},
		status: true,
	},
	{
		id: 5,
		name: { en: "Chairs" },
		description: { en: "Comfortable seating options for guests." },
		image: {
			src: "chairs.png",
			uploadDir: "amenities/",
			uploadDriver: 0,
		},
		status: true,
	},
	{
		id: 6,
		name: { en: "Wardrobe Rack" },
		description: { en: "A rack for hanging clothes and organizing belongings." },
		image: {
			src: "wardrobe-rack.png",
			uploadDir: "amenities/",
			uploadDriver: 0,
		},
		status: true,
	},
	{
		id: 7,
		name: { en: "Lighting Equipment" },
		description: { en: "Professional lighting equipment for optimal visibility." },
		image: {
			src: "lighting.png",
			uploadDir: "amenities/",
			uploadDriver: 0,
		},
		status: true,
	},
	{
		id: 8,
		name: { en: "White Backdrop" },
		description: { en: "A clean white backdrop for photography or videography." },
		image: {
			src: "white-backdrop.png",
			uploadDir: "amenities/",
			uploadDriver: 0,
		},
		status: true,
	},
];

export default async () => {
	try {
		console.log("Running Amenity Seeder");

		// Clear existing data
		await Amenity.deleteMany({});

		// Insert new data
		for (const item of data) {
			const response = await Amenity.create(item);
		}

		console.log("Amenity Seeding completed successfully");
	} catch (error) {
		console.error("Amenity Seeding failed:", error);
	}
};
