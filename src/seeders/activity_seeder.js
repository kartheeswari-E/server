import Activity from "../data/models/activity.js";

const data = [
	{
		id: 12,
		name: { en: "Birthday Party" },
		description: { en: "Celebrate your special day with friends and family" },
		activityType: 4, // Maps to 4
		image: {
			src: "birthday_party.jpg",
			uploadDir: "activities/",
			uploadDriver: 0,
		},
		isPopular: true, // "is_popular" field mapped to boolean
		status: true, // "Active" mapped to true
	},
	{
		id: 11,
		name: { en: "Reception" },
		description: { en: "Host a grand reception for your guests" },
		activityType: 4, // Maps to 4
		image: {
			src: "reception.jpg",
			uploadDir: "activities/",
			uploadDriver: 0,
		},
		isPopular: true,
		status: true,
	},
	{
		id: 10,
		name: { en: "Dance Party" },
		description: { en: "Get ready to groove on the dance floor" },
		activityType: 4, // Maps to 4
		image: {
			src: "daybreaker_dance.jpg",
			uploadDir: "activities/",
			uploadDriver: 0,
		},
		isPopular: true,
		status: true,
	},
	{
		id: 9,
		name: { en: "Memorial" },
		description: { en: "Pay tribute to your loved ones" },
		activityType: 3, // Maps to 3
		image: {
			src: "meorial-song.jpg",
			uploadDir: "activities/",
			uploadDriver: 0,
		},
		isPopular: true,
		status: true,
	},
	{
		id: 8,
		name: { en: "Job Fair" },
		description: { en: "Find your dream job at our job fair" },
		activityType: 3, // Maps to 3
		image: {
			src: "careerfair.png",
			uploadDir: "activities/",
			uploadDriver: 0,
		},
		isPopular: true,
		status: true,
	},
	{
		id: 7,
		name: { en: "Meetup" },
		description: { en: "Connect with like-minded individuals" },
		activityType: 3, // Maps to 3
		image: {
			src: "meetup-event.jpg",
			uploadDir: "activities/",
			uploadDriver: 0,
		},
		isPopular: false,
		status: true,
	},
	{
		id: 6,
		name: { en: "Team Meeting" },
		description: { en: "Collaborate with your team to achieve success" },
		activityType: 2, // Maps to 2
		image: {
			src: "team-meeting.jpg",
			uploadDir: "activities/",
			uploadDriver: 0,
		},
		isPopular: true,
		status: true,
	},
	{
		id: 5,
		name: { en: "Corporate Event" },
		description: { en: "Host a professional corporate event" },
		activityType: 1, // Maps to 1
		image: {
			src: "corporate-event.jpg",
			uploadDir: "activities/",
			uploadDriver: 0,
		},
		isPopular: true,
		status: true,
	},
	{
		id: 4,
		name: { en: "Charity Event" },
		description: { en: "Make a difference with our charity event" },
		activityType: 1, // Maps to 1
		image: {
			src: "charity-event.jpg",
			uploadDir: "activities/",
			uploadDriver: 0,
		},
		isPopular: false,
		status: true,
	},
	{
		id: 3,
		name: { en: "Product Release" },
		description: { en: "Launch your new product with a bang" },
		activityType: 1, // Maps to 1
		image: {
			src: "product-release.jpg",
			uploadDir: "activities/",
			uploadDriver: 0,
		},
		isPopular: true,
		status: true,
	},
	{
		id: 2,
		name: { en: "Banquet Hall" },
		description: { en: "Host a grand banquet for your guests" },
		activityType: 1, // Maps to 1
		image: {
			src: "banquet-hall.jpg",
			uploadDir: "activities/",
			uploadDriver: 0,
		},
		isPopular: true,
		status: true,
	},
	{
		id: 1,
		name: { en: "Auction" },
		description: { en: "Participate in an exciting auction event" },
		activityType: 1, // Maps to 1
		image: {
			src: "tehran_auction.jpg",
			uploadDir: "activities/",
			uploadDriver: 0,
		},
		isPopular: false,
		status: true,
	},
];

export default async () => {
	try {
		console.log("Running Activity Seeder");

		// Clear existing data
		await Activity.deleteMany({});

		// Insert new data
		for (const item of data) {
			const response = await Activity.create(item);
		}

		console.log("Activity Seeding completed successfully");
	} catch (error) {
		console.error("Activity Seeding failed:", error);
	}
};
