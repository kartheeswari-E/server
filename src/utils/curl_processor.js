import fetch from "node-fetch";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 86400 });

const getCurlResult = async (url, key) => {
	const cacheKey = `curl_res_${key.toLowerCase()}`;

	// Check if the response is cached
	const cachedData = cache.get(cacheKey);
	if (cachedData) {
		return cachedData;
	}

	// Make the request if not cached
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const result = await response.json(); // Assuming the response is JSON

		// Store the response in the cache
		cache.set(cacheKey, result);

		return result;
	} catch (error) {
		console.error("Error fetching URL:", error);
		throw error;
	}
};

export default getCurlResult;
