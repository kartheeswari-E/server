import Blog from "../data/models/blog.js";

const mainBlogData = [
	{
		id: 1,
		slug: "booking",
		title: { en: "Booking" },
		description: { en: "Get help with a reservation, contacting your host, and more." },
		image: {
			src: "booking_image.png", // Placeholder for actual image
			uploadDir: "blogs/",
			uploadDriver: 0,
		},
		blogs: [
			{
				id: 12,
				slug: "how-do-i-reset-or-change-my-password",
				title: { en: "How do I reset or change my password?" },
				content: { en: "" },
				tags: "",
				isPopular: false,
				status: true,
			},
			{
				id: 11,
				slug: "how-do-i-connect-my-facebook-and-hyra-space-accounts",
				title: { en: "How do I connect my Facebook and Hyra Space accounts?" },
				content: { en: "" },
				tags: "",
				isPopular: false,
				status: true,
			},
		],
		isPopular: true,
		status: true,
	},
	{
		id: 2,
		slug: "hosting",
		title: { en: "Hosting" },
		description: { en: "Get help updating your calendar, communicating with guests, and more." },
		image: {
			src: "hosting_image.png", // Placeholder for actual image
			uploadDir: "blogs/",
			uploadDriver: 0,
		},
		blogs: [
			{
				id: 10,
				slug: "how-do-i-search-for-a-space",
				title: { en: "How do I search for a space?" },
				content: { en: "" },
				tags: "",
				isPopular: true,
				status: true,
			},
		],
		isPopular: true,
		status: true,
	},
	{
		id: 3,
		slug: "searching-and-booking",
		title: { en: "Searching and Booking" },
		description: { en: "" },
		image: {
			src: "searching_image.png", // Placeholder for actual image
			uploadDir: "blogs/",
			uploadDriver: 0,
		},
		blogs: [],
		isPopular: false,
		status: true,
	},
	{
		id: 4,
		slug: "payments-pricing-and-refunds",
		title: { en: "Payments, Pricing, and Refunds" },
		description: { en: "" },
		image: {
			src: "payments_image.png", // Placeholder for actual image
			uploadDir: "blogs/",
			uploadDriver: 0,
		},
		blogs: [
			{
				id: 9,
				slug: "what-happens-if-a-host-wants-to-collect-on-their-security-deposit",
				title: { en: "What happens if a host wants to collect on their security deposit?" },
				content: { en: "" },
				tags: "",
				isPopular: false,
				status: true,
			},
			{
				id: 8,
				slug: "what-if-a-host-asks-for-more-money",
				title: { en: "What if a host asks for more money?" },
				content: { en: "" },
				tags: "",
				isPopular: false,
				status: true,
			},
			{
				id: 7,
				slug: "what-is-the-hyra-space-cancellation-policy-for-stays",
				title: { en: "What is the Hyra Space cancellation policy for stays?" },
				content: { en: "" },
				tags: "",
				isPopular: false,
				status: true,
			},
		],
		isPopular: false,
		status: true,
	},
	{
		id: 5,
		slug: "safety-and-accessibility",
		title: { en: "Safety and Accessibility" },
		description: { en: "" },
		image: {
			src: "safety_image.png", // Placeholder for actual image
			uploadDir: "blogs/",
			uploadDriver: 0,
		},
		blogs: [
			{
				id: 6,
				slug: "what-are-some-safety-tips-for-hosts-of-places-to-events",
				title: { en: "What are some safety tips for hosts of places to events?" },
				content: { en: "" },
				tags: "",
				isPopular: true,
				status: true,
			},
			{
				id: 5,
				slug: "what-is-hyra-space-doing-to-help-hosts-make-their-homes-safer-for-guests",
				title: { en: "What is Hyra Space doing to help hosts make their homes safer for guests?" },
				content: { en: "" },
				tags: "",
				isPopular: true,
				status: true,
			},
		],
		isPopular: false,
		status: true,
	},
	{
		id: 6,
		slug: "your-account",
		title: { en: "Your Account" },
		description: { en: "" },
		image: {
			src: "account_image.png", // Placeholder for actual image
			uploadDir: "blogs/",
			uploadDriver: 0,
		},
		blogs: [
			{
				id: 4,
				slug: "how-do-i-reset-my-account-password",
				title: { en: "How do I reset my account password?" },
				content: { en: "" },
				tags: "",
				isPopular: false,
				status: true,
			},
			{
				id: 3,
				slug: "how-do-i-update-my-account-information",
				title: { en: "How do I update my account information?" },
				content: { en: "" },
				tags: "",
				isPopular: false,
				status: true,
			},
		],
		isPopular: false,
		status: true,
	},
	{
		id: 7,
		slug: "about-hyra-space",
		title: { en: "About Hyra Space" },
		description: { en: "" },
		image: {
			src: "about_image.png", // Placeholder for actual image
			uploadDir: "blogs/",
			uploadDriver: 0,
		},
		blogs: [
			{
				id: 2,
				slug: "what-is-hyra-space",
				title: { en: "What is Hyra Space?" },
				content: { en: "" },
				tags: "",
				isPopular: true,
				status: true,
			},
			{
				id: 1,
				slug: "how-hyra-space-works",
				title: { en: "How does Hyra Space work?" },
				content: { en: "" },
				tags: "",
				isPopular: true,
				status: true,
			},
		],
		isPopular: false,
		status: true,
	},
	{
		id: 8,
		slug: "your-listings",
		title: { en: "Your Listings" },
		description: { en: "" },
		image: {
			src: "listings_image.png", // Placeholder for actual image
			uploadDir: "blogs/",
			uploadDriver: 0,
		},
		blogs: [
			{
				id: 2,
				slug: "how-to-manage-your-listings",
				title: { en: "How to manage your listings?" },
				content: { en: "" },
				tags: "",
				isPopular: true,
				status: true,
			},
			{
				id: 1,
				slug: "how-to-add-a-new-listing",
				title: { en: "How to add a new listing?" },
				content: { en: "" },
				tags: "",
				isPopular: true,
				status: true,
			},
		],
		isPopular: false,
		status: true,
	},
	{
		id: 9,
		slug: "your-calendar",
		title: { en: "Your Calendar" },
		description: { en: "" },
		image: {
			src: "calendar_image.png", // Placeholder for actual image
			uploadDir: "blogs/",
			uploadDriver: 0,
		},
		blogs: [
			{
				id: 2,
				slug: "how-to-sync-your-calendar",
				title: { en: "How to sync your calendar?" },
				content: { en: "" },
				tags: "",
				isPopular: true,
				status: true,
			},
			{
				id: 1,
				slug: "how-to-manage-your-calendar",
				title: { en: "How to manage your calendar?" },
				content: { en: "" },
				tags: "",
				isPopular: true,
				status: true,
			},
		],
		isPopular: false,
		status: true,
	},
	{
		id: 10,
		slug: "how-payouts-work",
		title: { en: "How Payouts Work" },
		description: { en: "" },
		image: {
			src: "payouts_image .png", // Placeholder for actual image
			uploadDir: "blogs/",
			uploadDriver: 0,
		},
		blogs: [
			{
				id: 2,
				slug: "how-to-set-up-your-payouts",
				title: { en: "How to set up your payouts?" },
				content: { en: "" },
				tags: "",
				isPopular: true,
				status: true,
			},
			{
				id: 1,
				slug: "when-will-i-receive-my-payouts",
				title: { en: "When will I receive my payouts?" },
				content: { en: "" },
				tags: "",
				isPopular: true,
				status: true,
			},
		],
		isPopular: false,
		status: true,
	},
];

export default async () => {
	try {
		console.log("Running Blog Seeder");

		// Clear existing data
		await Blog.deleteMany({});

		// Insert new data
		for (const item of mainBlogData) {
			const response = await Blog.create(item);
		}

		console.log("Blog Seeding completed successfully");
	} catch (error) {
		console.error("Blog Seeding failed:", error);
	}
};
