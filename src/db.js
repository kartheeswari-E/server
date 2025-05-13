import mongoose from "mongoose";
import config from "./config.js";

export default async () => {
	try {
		var url = `${config.db.domain}://${config.db.username}:${config.db.password}@${config.db.host}`;
		if (config.db.port != null) {
			url += ":" + config.db.port;
		}
		if (config.db.database != null) {
			url += "/" + config.db.database;
		}
		if (config.db.authSource != null) {
			url += "?authSource=" + config.db.authSource;
		}

		const conn = await mongoose.connect(url);
		console.log(`Database Connected with : ${conn.connection.host}`);
		return conn;
	}
	catch (err) {
		console.error(`Unable to esablish database connection: ${err.message}`);
		process.exit(1);
	}
};
