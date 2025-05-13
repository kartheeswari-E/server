import ActivityType from "../data/models/activity_type.js";

const data = [
	{
		id: 7,
		name: { en: "Workshop" },
		image: {
			src: "workshop.jpg",
			uploadDir: "activity_types/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 6,
		name: { en: "Pop-Up" },
		image: {
			src: "globe-popup.jpg",
			uploadDir: "activity_types/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 5,
		name: { en: "Film Shoot" },
		image: {
			src: "filmmaking-preview.jpg",
			uploadDir: "activity_types/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 4,
		name: { en: "Party" },
		image: {
			src: "concert.webp",
			uploadDir: "activity_types/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 3,
		name: { en: "Networking" },
		image: {
			src: "tech-event-meetup.jpg",
			uploadDir: "activity_types/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 2,
		name: { en: "Meetings" },
		image: {
			src: "business-meetings.jpg",
			uploadDir: "activity_types/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
	{
		id: 1,
		name: { en: "Events" },
		image: {
			src: "party-event.jpg",
			uploadDir: "activity_types/",
			uploadDriver: 0,
		},
		status: true, // "Active" mapped to true
	},
];

export default async () => {
	try {
		console.log("Running ActivityType Seeder");

		// Clear existing data
		await ActivityType.deleteMany({});

		// Insert new data
		for (const item of data) {
			const response = await ActivityType.create(item);
		}

		console.log("ActivityType Seeding completed successfully");
	} catch (error) {
		console.error("ActivityType Seeding failed:", error);
	}
};
