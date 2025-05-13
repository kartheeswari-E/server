import GuestAccess from "../data/models/guest_access.js";

const data = [
	{
		id: 1,
		name: { en: "Kitchen" },
		description: { en: "A fully equipped kitchen with modern appliances." },
		status: true, // "Active" mapped to true
	},
	{
		id: 2,
		name: { en: "Laundry – washing machine" },
		description: { en: "Laundry facilities including a washing machine." },
		status: true, // "Active" mapped to true
	},
	{
		id: 3,
		name: { en: "Elevator" },
		description: { en: "Convenient elevator access to all floors." },
		status: true, // "Active" mapped to true
	},
	{
		id: 4,
		name: { en: "Parking" },
		description: { en: "Secure parking space available for guests." },
		status: true, // "Active" mapped to true
	},
	{
		id: 5,
		name: { en: "Pool" },
		description: { en: "Outdoor swimming pool for relaxation and enjoyment." },
		status: true, // "Active" mapped to true
	},
	{
		id: 6,
		name: { en: "Hot tub" },
		description: { en: "A relaxing hot tub for guests to unwind." },
		status: true, // "Active" mapped to true
	},
];
export default async () => {
	try {
		console.log("Running GuestAccess Seeder");

		// Clear existing data
		await GuestAccess.deleteMany({});

		// Insert new data
		for (const item of data) {
			const response = await GuestAccess.create(item);
		}

		console.log("GuestAccess Seeding completed successfully");
	} catch (error) {
		console.error("GuestAccess Seeding failed:", error);
	}
};
