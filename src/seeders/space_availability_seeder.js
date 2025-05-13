import SpaceAvailability from "../data/models/space_availability.js";

const data = [];

export default async () => {
	try {
		console.log("Running Space Availability Seeder");

		await SpaceAvailability.deleteMany({});

		for (const item of data) {
			await SpaceAvailability.create(item);
		}
	} catch (error) {
		console.error("Space Availability Seeding failed:", error);
	}
};
