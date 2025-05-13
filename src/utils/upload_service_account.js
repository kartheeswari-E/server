import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { finished } from "stream/promises";

const uploadServiceAccountJson = async (file) => {
	if (!file) return null;

	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	const credentialsDir = path.join(__dirname, "..", "src", "credentials");
	const fileName = "serviceAccount.json";
	const outPath = path.join(credentialsDir, fileName);

	// Check if the file already exists and delete it
	if (fs.existsSync(outPath)) {
		fs.unlinkSync(outPath);
	}

	const { createReadStream } = await file;
	const stream = createReadStream();
	const out = fs.createWriteStream(outPath);

	stream.pipe(out);
	await finished(out);

	return {
		message: "serviceAccount.json uploaded successfully",
		path: outPath,
	};
};

export default uploadServiceAccountJson;
