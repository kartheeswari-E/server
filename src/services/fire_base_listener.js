import Conversation from "../data/models/conversation.js";
import db from "../firebase.js";

const setupFirebaseListeners = () => {
	const messagesRef = db.ref("messages");

	messagesRef.on("child_added", async (snapshot) => {
		const newMessage = snapshot.val();

		// console.log("New message detected:", newMessage);

		const conversation = await Conversation.findOne({ id: newMessage.conversationId });
		if (conversation) {
			// console.log("Fetched conversation:", conversation);
		} else {
			// console.error("Conversation not found for message:", newMessage);
		}
	});
};

export default setupFirebaseListeners;
