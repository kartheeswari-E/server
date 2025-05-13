import Transaction from "../data/models/transaction.js";

const data = [];

export default async () => {
	try {
		console.log("Running Transaction Seeder");

		await Transaction.deleteMany({});

		for (const item of data) {
			await Transaction.create(item);
		}
	} catch (error) {
		console.error("Transaction Seeding failed:", error);
	}
};
