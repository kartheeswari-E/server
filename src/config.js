import dotenv from "dotenv";

dotenv.config();

export default {
	port: process.env.SERVER_PORT || 4000,
	secret: process.env.SECRET || "HYRA",
	db: {
		domain: process.env.DB_DOMAIN || "mongodb",
		host: process.env.DB_HOST || "127.0.0.1",
		port: process.env.DB_PORT || null,
		username: process.env.DB_USERNAME || "root",
		password: process.env.DB_PASSWORD || "password",
		database: process.env.DB_DATABASE || null,
		authSource: process.env.DB_AUTH_SOURCE || null,
	},
};
