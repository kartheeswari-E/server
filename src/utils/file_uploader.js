import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { finished } from "stream/promises";

const uploadFile = async (file, options = {}) => {
	if (!file) return null;
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	const publiDir = path.join(path.dirname(__dirname), "..", "public");

	let outDir = "";
	if (options.uploadPath) {
		outDir += options.uploadPath + "/";
	}
	const { createReadStream, filename } = await file;
	var ext = path.extname(filename);
	var name = "";
	if (options.namePrefix) {
		name += options.namePrefix;
	}
	if (options.addTime) {
		name += Math.floor(Date.now() / 1000);
	}
	if (name == "") {
		name = filename;
	} else {
		name += ext;
	}

	const stream = createReadStream();

	const targetDir = path.join(publiDir, "/images/", outDir);
	if (!fs.existsSync(targetDir)) {
		fs.mkdirSync(targetDir, { recursive: true });
	}

	const outPath = path.join(publiDir, "/images/" + outDir, name);
	const out = fs.createWriteStream(outPath);
	stream.pipe(out);
	await finished(out);
	let host = process.env.APP_URL;
	return {
		uploadDir: outDir,
		uploadDriver: 0,
		name: name,
		path: `${host}/images/${outDir}/${name}`,
	};
};

export const deleteFile = async () => {};

export const fetchFile = async (image) => {
	if (image.uploadDriver == 0) {
		let host = process.env.APP_URL;
		if (image.src == undefined) {
			return null;
		}
		let uploadDir = image.uploadDir != undefined ? image.uploadDir : "";
		return host + "/images/" + uploadDir + image.src;
	}
	return image.src;
};

export default uploadFile;
