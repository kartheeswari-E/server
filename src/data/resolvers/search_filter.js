import Currency from "../models/currency.js";
import Credential from "../models/credential.js";
import Amenity from "../models/amenity.js";
import Space from "../models/space.js";
import Activity from "../models/activity.js";
import getCurlResult from "../../utils/curl_processor.js";
import { gql } from "apollo-server-express";
import Review from "../models/review.js";

export const searchSpaceTypeDef = gql`
	type Query {
		searchSpace(filters: JSON, page: Int): SpaceSearchResult
	}
`;

async function fetchSpaces(filters, minLat, maxLat, minLng, maxLng) {
	return Space.aggregate([
		{
			$match: {
				"spaceAddress.latitude": { $gte: minLat, $lte: maxLat },
				"spaceAddress.longitude": { $gte: minLng, $lte: maxLng },
				status: "listed",
				adminStatus: "approved",
				deletedAt: null,
			},
		},
		{
			$lookup: {
				from: "users",
				localField: "userId",
				foreignField: "id",
				as: "user",
			},
		},
		{ $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
		{
			$lookup: {
				from: "space_types",
				localField: "spaceType",
				foreignField: "id",
				as: "spaceType",
			},
		},
		{ $unwind: { path: "$spaceType", preserveNullAndEmptyArrays: true } },
		{ $sort: { id: -1 } },
	]).exec();
}

// Helper Function: Calculate Pagination
function paginate(data, page, perPage = 10) {
	const totalItems = data.length;
	const firstItem = (page - 1) * perPage;
	return {
		current_page: page,
		data: data.slice(firstItem, firstItem + perPage),
		from: firstItem + 1,
		to: Math.min(firstItem + perPage, totalItems),
		per_page: perPage,
		last_page: Math.ceil(totalItems / perPage),
		total: totalItems,
	};
}

const searchFilterQueryDef = {
	searchSpace: async (_, { filters = {}, page = 1 }, context) => {
		// Validate page input
		if (typeof page !== "number" || page <= 0) {
			throw new Error("Invalid page number.");
		}

		// Fetch required data
		const amenities = await Amenity.find({ status: true });
		const currencies = await Currency.find();
		const credentials = await Credential.findOne();
		const instantBook = filters.instantBook === true || filters.instantBook === "true";
		const freeCancellation = filters.freeCancellation === true || filters.freeCancellation === "true";

		// Handle activity type filter
		let activityType;
		if (filters.activity_type) {
			activityType = await Activity.findOne({ id: parseInt(filters.activity_type) });
		}

		// Geolocation boundaries
		let minLat = -1000,
			minLng = -1000,
			maxLat = 1000,
			maxLng = 1000;

		// Process place details if `place_id` is provided
		if (filters.place_id) {
			try {
				const placeDetails = await getCurlResult(
					`https://maps.googleapis.com/maps/api/place/details/json?key=${credentials.googleMap.serverKey}&place_id=${filters.place_id}&fields=address_component,geometry,formatted_address`,
					filters.place_id,
				);
				if (placeDetails.status === "OK" && placeDetails.result?.geometry) {
					const { southwest, northeast } = placeDetails.result.geometry.viewport;
					minLat = southwest.lat - 0.1;
					minLng = southwest.lng - 0.1;
					maxLat = northeast.lat + 0.1;
					maxLng = northeast.lng + 0.1;
				}
			} catch (error) {
				console.error("Error fetching place details:", error);
			}
		}

		// Correct longitude wrap-around
		if (minLng > maxLng) {
			if (maxLng > 0) {
				[maxLng, minLng] = [-180, minLng];
			} else {
				maxLng = 180;
			}
		}

		// Fetch spaces
		const spaces = await fetchSpaces(filters, minLat, maxLat, minLng, maxLng);

		// Process spaces
		const data = await Promise.all(
			spaces.map(async (space) => {
				// Filter by instant booking
				if (instantBook && space.bookingType !== "instant") {
					return null;
				}

				// Filter by free cancellation
				if (freeCancellation && space.cancellationPolicy !== "1") {
					return null;
				}

				// Filter by space type
				if (filters.space_types && filters.space_types.length > 0) {
					if (!filters.space_types.includes(space.spaceType?.id)) {
						return null;
					}
				}

				// Filter for guests
				if (filters.guests) {
					const requiredGuests = parseInt(filters.guests, 10);
					if (!isNaN(requiredGuests) && !space.activity.some((activity) => activity.maxGuest >= requiredGuests)) {
						return null;
					}
				}

				// Filter by amenities
				if (filters.amenities && filters.amenities.length > 0) {
					const spaceAmenities = space.amenities || [];
					if (!filters.amenities.every((id) => spaceAmenities.includes(id))) {
						return null;
					}
				}

				// Filter by activity type
				if (filters.activity_type && !space.activity.some((activity) => activity.type === activityType?.activityType && activity.status)) {
					return null;
				}

				// Filter by price
				const minPrice = filters.min_price || 1;
				const maxPrice = filters.max_price || 10000000;
				if (!space.activity.some((activity) => activity.pricePerHour >= minPrice && activity.pricePerHour <= maxPrice)) {
					return null;
				}

				// Filter by size
				if (filters.size && space.maxSpace < filters.size) {
					return null;
				}

				// Build processed space
				const filteredActivity = space.activity.filter((activity) => activity.status).sort((a, b) => a.pricePerHour - b.pricePerHour);

				if (filteredActivity.length === 0) return null;

				const currency = currencies.find((item) => item.code === filteredActivity[0]?.currencyCode);

				async function spaceReviewCount() {
					const reviews = await Review.find({ userType: "user", spaceId: space.id });
					const now = new Date();
					const aboutReviewsFilter = [];
					let totalRating = 0;
					let ratingCount = 0;

					function checkValue(value) {
						return Boolean(value?.privateReview && value?.publicReview);
					}

					await Promise.all(
						reviews.map(async (review) => {
							const { privateReview, publicReview, expireDate, userType, rating } = review;
							const reservationReviews = await Review.find({ reservationId: review.reservationId });
							const hostReview = reservationReviews.find((data) => data.userType === "host");
							const hostCheck = checkValue(hostReview);

							const isExpired = new Date(expireDate) < now;

							let show = false;

							if (!privateReview && !publicReview) return;

							if ((userType === "user" && hostCheck) || isExpired) {
								show = true;
							}

							if (!show) return;
							aboutReviewsFilter.push(review);
							if (rating && show) {
								totalRating += rating;
								ratingCount++;
							}
						}),
					);

					const averageRating = ratingCount > 0 ? totalRating / ratingCount : 0;

					return { averageRating, ratingCount };
				}

				return {
					id: space.id,
					userId: space.userId,
					name: space.name?.en || "",
					description: space.description?.en || "",
					starRating: (await spaceReviewCount()).averageRating || null,
					totalRating: (await spaceReviewCount()).ratingCount || null,
					spaceTypeName: space.spaceType?.name?.en || "",
					bookingType: space.bookingType || "",
					amenities: amenities
						.filter((amenity) => space.amenities?.includes(amenity.id) && amenity.status)
						.slice(0, 5)
						.map((amenity) => ({
							id: amenity.id,
							name: amenity.name?.en || "",
							image: amenity.image,
						})),
					spaceAddress: space.spaceAddress || null,
					spacePhotos: space.spacePhotos || [],
					rating: space.rating || null,
					maxSpace: space.maxSpace,
					rooms: space.roomCount || null,
					updatedAt: space.updatedAt || null,
					currencyCode: currency?.code || "",
					currencySymbol: currency?.symbol || "",
					price: filteredActivity[0]?.pricePerHour || 0,
					priceText: `${currency?.symbol || ""} ${filteredActivity[0]?.pricePerHour || 0}`,
					guests: filteredActivity[0]?.maxGuest || 0,
					createdAt: space.createdAt || null,
					isSaved: false,
				};
			}),
		);

		// Filter out null spaces
		const filteredData = data.filter((space) => space !== null);

		// Return paginated result
		return paginate(filteredData, page);
	},
};

// Resolver
const searchFilterResolver = {
	Query: searchFilterQueryDef,
};

export default searchFilterResolver;
