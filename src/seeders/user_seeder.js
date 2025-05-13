import User from "../data/models/user.js";

export default async () => {
	try {
		console.log("Running User Seeder");

		await User.deleteMany({});

		await User.create({
			id: 10001,
			isHost: 1,
			stripeCustomerId: "",
			userName: "peter10001",
			firstName: "Peter",
			lastName: "pants",
			email: "peter@cron24.com",
			password: "12345678",
			countryCode: "US",
			phoneCode: "1",
			phoneNumber: "9876543210",
			timezone: "UTC",
			userLanguage: "en",
			userCurrency: "USD",
			dob: new Date("1996-04-15"),
			gender: "male",
			status: "active",
			verifications: {
				email: true,
				phoneNumber: true,
				facebook: false,
				google: true,
				apple: false,
				idDocument: true,
			},
			penalty: {
				currencyCode: "USD",
				total: 100.0,
				paid: 100.0,
				waived_off: 0,
				remaining: 0,
			},
		});

		await User.create({
			id: 10002,
			isHost: 0,
			stripeCustomerId: "",
			userName: "paige10002",
			firstName: "Paige",
			lastName: "Turner",
			email: "paige@cron24.com",
			password: "12345678",
			countryCode: "US",
			phoneCode: "1",
			phoneNumber: "9876543211",
			timezone: "UTC",
			userLanguage: "en",
			userCurrency: "USD",
			dob: new Date("1996-08-25"),
			gender: "female",
			status: "active",
			verifications: {
				email: true,
				phoneNumber: true,
				facebook: false,
				google: false,
				apple: false,
				idDocument: false,
			},
			penalty: {
				currencyCode: "USD",
				total: 0,
				paid: 0,
				waived_off: 0,
				remaining: 0,
			},
		});
	} catch (error) {
		console.error("User Seeding failed:", error);
	}
};
