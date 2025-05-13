import { existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import connectDB from "../db.js";

const args = process.argv.slice(2);
const seederFile = args[0];

if (!seederFile) {
	console.error("Please provide a seeder file name.");
	process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB().then(async () => {
	const seederPath = join(__dirname, `${seederFile}.js`);

	if (existsSync(seederPath)) {
		import(seederPath)
			.then((module) => {
				const seeder = module.default;
				seeder().then(() => {
					setTimeout(() => {
						console.log("Seed Completed");
						process.exit(1);
					}, 1000);
				});
			})
			.catch((err) => {
				console.error(`Error loading seeder: ${err.message}`);
				process.exit(1);
			});
	} else {
		console.error(`Seeder file "${seederFile}.js" not found.`);
		process.exit(1);
	}
});
