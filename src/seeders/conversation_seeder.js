import Conversation from "../data/models/conversation.js";

const data = [];

export default async () => {
	try {
		console.log("Running Conversation Seeder");

		await Conversation.deleteMany({});

		for (const item of data) {
			await Conversation.create(item);
		}
	} catch (error) {
		console.error("Conversation Seeding failed:", error);
	}
};
