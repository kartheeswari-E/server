import SpecialOffer from "../data/models/special_offer.js";

const data = [];

export default async () => {
	try {
		console.log("Running Special Offer Seeder");

		await SpecialOffer.deleteMany({});

		for (const item of data) {
			await SpecialOffer.create(item);
		}
	} catch (error) {
		console.error("Special Offer Seeding failed:", error);
	}
};
