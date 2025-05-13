import admin from "firebase-admin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const serviceAccount = require("../src/credentials/serviceAccount.json");

try {
	const databaseURL = process.env.FIREBASE_DATABASE_URL;

	if (!databaseURL) {
		throw new Error("Environment variable FIREBASE_DATABASE_URL is required.");
	}

	if (!admin.apps.length) {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL,
		});
	}
} catch (error) {
	console.error("Failed to initialize Firebase Admin SDK:", error.message);
	process.exit(1);
}

const db = admin.database();

export default db;
