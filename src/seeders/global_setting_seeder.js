import GlobalSetting from "../data/models/global_setting.js";

export default async () => {
	try {
		console.log("Running GlobalSetting Seeder");

		await GlobalSetting.deleteMany({});

		await GlobalSetting.create({
			id: 1,
			siteName: "Hyra Space",
			siteUrl: "",
			version: "1.0",
			appVersion: "1.0.0",
			forceUpdate: false,
			playStore: "https://play.google.com/store/apps/details?id=com.cron24.hyra",
			appStore: "",
			socialMediaLinks: {
				facebook: "https://www.facebook.com/Cron24-117062946355093",
				instagram: "https://www.instagram.com/cron24technologies",
				twitter: "https://twitter.com/Cron24Tech",
				linkedin: "https://www.linkedin.com/company/cron24-technologies",
				pinterest: "https://www.pinterest.com/cron24Technologies",
				youtube: "https://www.youtube.com/channel/UC9yYjwf0DPF8S5PLyO13g6w",
				skype: "",
				whatsapp: "",
				viber: "",
			},
			startingYear: new Date().getFullYear(),
			timezone: "Asia/Kolkata",
			defaultUploadDriver: "0",
			supportNumber: "9876543210",
			supportEmail: "support@cron24.com",
			defaultCurrency: "USD",
			defaultLanguage: "en",
			currencyFormat: "1",
			dateFormat: "1",
			minPrice: "1",
			maxPrice: "100000",
			maxGuests: 16,
			logo: {
				src: "/logo.png",
				uploadDir: "logos/",
				uploadDriver: "0",
			},
			secondaryLogo: {
				src: "logo.png",
				uploadDir: "logos/",
				uploadDriver: "0",
			},
			favicon: {
				src: "favicon.png",
				uploadDir: "logos/",
				uploadDriver: "0",
			},
			footerImage: {
				src: "footer.png",
				uploadDir: "logos/",
				uploadDriver: "0",
			},
			smsProvider: "twilio",
			mapProvider: "google",
			autocompleteProvider: "google",
			userInactiveDays: 0,
			defaultUserStatus: "active",
			defaultListingStatus: "approved",
			defaultExperienceStatus: "approved",
			backupPeriod: "never",
			autoPayout: false,
			otpEnabled: false,
			disputeDefaultApproval: false,
			copyrightLink: "https://www.cron24.com/airbnb-clone",
			copyrightText: "Hyra 2024. All Rights Reserved",
			maxReviewDays: 14,
			experienceEnabled: true,
			payoutHoldDays: 2,
			maxGuestDisputeDays: 7,
			maxHostDisputeDays: 7,
			fee: {
				serviceFeeType: "percentage",
				serviceFee: 10,
				minServiceFee: 20,
				hostFee: 5,
				hostPenaltyEnabled: false,
				hostCancelLimit: 5,
				penaltyDays: 7,
				cancelBeforeDays: 50,
				cancelAfterDays: 100,
			},
			referralSetting: {
				isEnabled: false,
				perUserLimit: 5000,
				newReferralCredit: 10,
				userBecomeGuestCredit: 20,
				userBecomeHostCredit: 80,
			},
		});
	} catch (error) {
		console.error("GlobalSetting Seeding failed:", error);
	}
};
