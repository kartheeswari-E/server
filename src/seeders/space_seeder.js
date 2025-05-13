import Space from "../data/models/space.js";

const data = [
	{
		id: 10001,
		userId: 10001,
		name: { en: "Cozy Space with Comfortable Seating & Natural Light" },
		description: { en: "A perfect outdoor space with natural light and comfortable seating." },
		spaceTypeName: { en: "Outdoor Space" },
		roomCount: 3,
		restRoomCount: 1,

		amenities: [2, 3, 4, 7, 6, 5],
		spaceRules: [2],
		guestAccesses: [1, 2, 4],
		services: [6, 1, 5],
		availability: {
			sunday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			monday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			tuesday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			wednesday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			thursday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			friday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			saturday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
		},
		activity: [
			{
				type: 1,
				currencyCode: "USD",
				minHours: "2",
				maxHours: "12",
				maxGuest: 100,
				pricePerHour: 50.0,
				cleaningFee: 10,
				securityFee: 20,
				status: true,
				stayDiscount: [
					{
						period: "4",
						percentage: "5",
					},
					{
						period: "8",
						percentage: "3",
					},
					{
						period: "12",
						percentage: "4",
					},
				],
				earlyDiscount: [
					{
						period: "5",
						percentage: "3",
					},
					{
						period: "10",
						percentage: "4",
					},
					{
						period: "20",
						percentage: "5",
					},
				],
			},
		],

		maxSpace: 700,
		bookingType: "request",
		cancellationPolicy: "1",
		status: "listed",
		adminStatus: "approved",
		totalRating: 2,
		rating: 5,
		spaceAddress: {
			city: "San Francisco",
			state: "California",
			countryCode: "US",
			latitude: 37.7585796,
			longitude: -122.4409402,
		},
		spacePhotos: [
			{ id: 1, image: { src: "/10001/listing_01588936830.jpg" } },
			{ id: 2, image: { src: "/10001/listing_01588936836.jpg" } },
			{ id: 3, image: { src: "/10001/listing_11588936836.jpg" } },
			{ id: 4, image: { src: "/10001/listing_21588936836.jpg" } },
			{ id: 5, image: { src: "/10001/listing_31588936836.jpg" } },
		],

		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 10002,
		userId: 10001,
		name: { en: "Uniquely Decorated, Lofted Event Space with Brilliant Lighting" },
		description: { en: "Lofted event space perfect for meetings and social gatherings." },
		spaceTypeName: { en: "Event Space" },
		roomCount: 2,
		restRoomCount: 1,
		maxSpace: 1200,

		amenities: [2, 3, 4, 7, 6, 5],
		spaceRules: [2],
		guestAccesses: [1, 2, 4],
		services: [6, 1, 5],
		availability: {
			sunday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			monday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			tuesday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			wednesday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			thursday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			friday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			saturday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
		},
		activity: [
			{
				type: 1,
				currencyCode: "USD",
				minHours: "3",
				maxHours: "12",
				maxGuest: 100,
				pricePerHour: 80.0,
				cleaningFee: 15,
				securityFee: 30,
				status: true,
				stayDiscount: [
					{
						period: "4",
						percentage: "5",
					},
					{
						period: "8",
						percentage: "3",
					},
					{
						period: "12",
						percentage: "4",
					},
				],
				earlyDiscount: [
					{
						period: "5",
						percentage: "3",
					},
					{
						period: "10",
						percentage: "4",
					},
					{
						period: "20",
						percentage: "5",
					},
				],
			},
		],

		bookingType: "request",
		cancellationPolicy: "4",
		status: "listed",
		adminStatus: "approved",
		totalRating: 0,
		rating: 0,
		spaceAddress: {
			city: "San Francisco",
			state: "California",
			countryCode: "US",
			latitude: 37.7945742,
			longitude: -122.3999445,
		},
		spacePhotos: [
			{ id: 1, image: { src: "/10002/listing_01589093513.jpg" } },
			{ id: 2, image: { src: "/10002/listing_01589093519.jpg" } },
			{ id: 3, image: { src: "/10002/listing_11589093519.jpg" } },
			{ id: 4, image: { src: "/10002/listing_21589093519.jpg" } },
			{ id: 5, image: { src: "/10002/listing_31589093519.jpg" } },
			{ id: 6, image: { src: "/10002/listing_01589093528.jpg" } },
		],

		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 10003,
		userId: 10001,
		name: { en: "Maverick" },
		description: { en: "A luxurious banquet hall for large gatherings and special events." },
		spaceTypeName: { en: "Banquet Hall" },
		roomCount: 10,
		restRoomCount: 10,
		maxSpace: 7000,

		amenities: [2, 3, 4, 7, 6, 5],
		spaceRules: [2],
		guestAccesses: [1, 2, 4],
		services: [6, 1, 5],
		availability: {
			sunday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			monday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			tuesday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			wednesday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			thursday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			friday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			saturday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
		},
		activity: [
			{
				type: 1,
				currencyCode: "USD",
				minHours: "1",
				maxHours: "24",
				maxGuest: 200,
				pricePerHour: 353.86,
				cleaningFee: 50,
				securityFee: 100,
				status: true,
				stayDiscount: [
					{
						period: "4",
						percentage: "5",
					},
					{
						period: "8",
						percentage: "3",
					},
					{
						period: "12",
						percentage: "4",
					},
				],
				earlyDiscount: [
					{
						period: "5",
						percentage: "3",
					},
					{
						period: "10",
						percentage: "4",
					},
					{
						period: "20",
						percentage: "5",
					},
				],
			},
		],

		bookingType: "instant",
		cancellationPolicy: "1",
		status: "listed",
		adminStatus: "approved",
		totalRating: 0,
		rating: 0,
		spaceAddress: {
			city: "Madurai",
			state: "Tamil Nadu",
			countryCode: "IN",
			latitude: 9.9301606,
			longitude: 78.0955669,
		},
		spacePhotos: [
			{ id: 1, image: { src: "/10003/listing_21726465522.jpg" } },
			{ id: 2, image: { src: "/10003/listing_01726465522.jpg" } },
			{ id: 3, image: { src: "/10003/listing_11726465522.jpg" } },
		],
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 10004,
		userId: 10002,
		name: { en: "Kirribilli Carriage House Creative Studio" },
		description: { en: "A creative studio space with a unique design and excellent amenities." },
		spaceTypeName: { en: "Photo Studio" },
		roomCount: 2,
		restRoomCount: 1,
		maxSpace: 300,

		amenities: [2, 3, 4, 7, 6, 5],
		spaceRules: [2],
		guestAccesses: [1, 2, 4],
		services: [6, 1, 5],
		availability: {
			sunday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			monday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			tuesday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			wednesday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			thursday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			friday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			saturday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
		},
		activity: [
			{
				type: 1,
				currencyCode: "USD",
				minHours: "2",
				maxHours: "8",
				maxGuest: 50,
				pricePerHour: 75.0,
				cleaningFee: 20,
				securityFee: 50,
				status: true,
				stayDiscount: [
					{
						period: "4",
						percentage: "5",
					},
					{
						period: "8",
						percentage: "3",
					},
					{
						period: "12",
						percentage: "4",
					},
				],
				earlyDiscount: [
					{
						period: "5",
						percentage: "3",
					},
					{
						period: "10",
						percentage: "4",
					},
					{
						period: "20",
						percentage: "5",
					},
				],
			},
		],

		bookingType: "request",
		cancellationPolicy: "3",
		status: "listed",
		adminStatus: "approved",
		totalRating: 0,
		rating: 0,
		spaceAddress: {
			city: "Kirribilli",
			state: "New South Wales",
			countryCode: "AU",
			latitude: -33.8513227,
			longitude: 151.2191436,
		},
		spacePhotos: [
			{ id: 1, image: { src: "/10004/listing_21589118810.jpg" } },
			{ id: 2, image: { src: "/10004/listing_31589118810.jpg" } },
			{ id: 3, image: { src: "/10004/listing_41589118811.jpg" } },
			{ id: 4, image: { src: "/10004/listing_01589118868.jpg" } },
			{ id: 5, image: { src: "/10004/listing_11589118868.jpg" } },
		],

		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 10005,
		userId: 10002,
		name: { en: "Precita Park Event Venue + Outdoor Space" },
		description: { en: "A versatile outdoor space perfect for large-scale events." },
		spaceTypeName: { en: "Outdoor Space" },
		roomCount: 1,
		restRoomCount: 1,
		maxSpace: 600,

		amenities: [2, 3, 4, 7, 6, 5],
		spaceRules: [2],
		guestAccesses: [1, 2, 4],
		services: [6, 1, 5],
		availability: {
			sunday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			monday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			tuesday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			wednesday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			thursday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			friday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
			saturday: {
				openStatus: true,
				openTime: "00:00:00",
				closeTime: "23:59:00",
			},
		},
		activity: [
			{
				type: 1,
				currencyCode: "USD",
				minHours: "4",
				maxHours: "24",
				maxGuest: 1000,
				pricePerHour: 150.0,
				cleaningFee: 100,
				securityFee: 200,
				status: true,
				stayDiscount: [
					{
						period: "4",
						percentage: "5",
					},
					{
						period: "8",
						percentage: "3",
					},
					{
						period: "12",
						percentage: "4",
					},
				],
				earlyDiscount: [
					{
						period: "5",
						percentage: "3",
					},
					{
						period: "10",
						percentage: "4",
					},
					{
						period: "20",
						percentage: "5",
					},
				],
			},
		],

		bookingType: "instant",
		cancellationPolicy: "2",
		status: "listed",
		adminStatus: "approved",
		totalRating: 0,
		rating: 0,
		spaceAddress: {
			city: "San Francisco",
			state: "California",
			countryCode: "US",
			latitude: 37.7389496,
			longitude: -122.4152013,
		},
		spacePhotos: [
			{ id: 1, image: { src: "/10005/listing_01589093285.jpg" } },
			{ id: 2, image: { src: "/10005/listing_11589093285.jpg" } },
			{ id: 3, image: { src: "/10005/listing_21589093285.png" } },
			{ id: 4, image: { src: "/10005/listing_31589093286.jpg" } },
			{ id: 5, image: { src: "/10005/listing_41589093286.jpg" } },
		],

		createdAt: new Date(),
		updatedAt: new Date(),
	},
];
export default async () => {
	try {
		console.log("Running Space Seeder");

		await Space.deleteMany({});

		for (const item of data) {
			const response = await Space.create(item);
		}
	} catch (error) {
		console.error("Space Seeding failed:", error);
	}
};
