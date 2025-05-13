import { gql } from "apollo-server-express";

const globalSettingType = gql`
	type SocialMediaLinks {
		facebook: String
		instagram: String
		twitter: String
		linkedin: String
		pinterest: String
		youtube: String
		skype: String
		whatsapp: String
		viber: String
	}

	type Fee {
		serviceFeeType: String
		serviceFee: Float
		minServiceFee: Float
		hostFee: Float
		hostPenaltyEnabled: Boolean
		hostCancelLimit: Int
		penaltyDays: Int
		cancelBeforeDays: Float
		cancelAfterDays: Float
	}

	type ReferralSetting {
		isEnabled: Boolean
		perUserLimit: Float
		newReferralCredit: Float
		userBecomeGuestCredit: Float
		userBecomeHostCredit: Float
	}

	type GlobalSetting {
		siteName: String
		version: String
		siteUrl: String
		vendorUrl: String
		appVersion: String
		forceUpdate: Boolean
		localUrl: Boolean
		playStore: String
		maintenance: Boolean
		appMaintenance: Boolean
		adminUrl: String
		appStore: String
		socialMediaLinks: SocialMediaLinks
		startingYear: String
		timezone: String
		defaultUploadDriver: String
		supportNumber: String
		supportEmail: String
		defaultCurrency: String
		defaultLanguage: String
		currencyFormat: String
		dateFormat: String
		minPrice: String
		maxPrice: String
		maxRooms: Int
		maxAdults: Int
		maxChildren: Int
		logo: Image
		secondaryLogo: Image
		favicon: Image
		footerImage: Image
		headCode: String
		footCode: String
		smsProvider: String
		mapProvider: String
		autocompleteProvider: String
		userInactiveDays: Int
		defaultUserStatus: String
		defaultListingStatus: String
		defaultExperienceStatus: String
		backupPeriod: String
		autoPayout: Boolean
		otpEnabled: Boolean
		disputeDefaultApproval: Boolean
		copyrightLink: String
		copyrightText: String
		maxReviewDays: Int
		experienceEnabled: Boolean
		hostCoupon: Boolean
		payoutHoldDays: Int
		maxGuestDisputeDays: Int
		maxHostDisputeDays: Int
		lastCronJob: String
		fee: Fee
		referralSetting: ReferralSetting
	}

	type Settings {
		siteName: String
		version: String
		playStore: String
		appStore: String
		socialMediaLinks: SocialMediaLinks
		supportNumber: String
		supportEmail: String
		defaultCurrency: String
		defaultLanguage: String
		minPrice: String
		maxPrice: String
		maxRooms: Int
		maxAdults: Int
		maxChildren: Int
		logoSrc: String
		secondaryLogoSrc: String
		faviconSrc: String
		headCode: String
		footCode: String
		smsProvider: String
		mapProvider: String
		autocompleteProvider: String
		otpEnabled: Boolean
		copyrightLink: String
		copyrightText: String
		experienceEnabled: Boolean
		hostCoupon: Boolean
		mapboxApiKey: String
		googleApiKey: String
		googleClientId: String
		facebookAppId: String
		appleServiceId: String
		stripePublishKey: String
		languages: [Language]
		currencies: [Currency]
	}

	input SocialMediaLinksInput {
		facebook: String
		instagram: String
		twitter: String
		linkedin: String
		pinterest: String
		youtube: String
		skype: String
		whatsapp: String
		viber: String
	}

	input FeeInput {
		serviceFeeType: String
		serviceFee: Float
		minServiceFee: Float
		hostFee: Float
		hostPenaltyEnabled: Boolean
		hostCancelLimit: Int
		penaltyDays: Int
		cancelBeforeDays: Float
		cancelAfterDays: Float
	}

	input ReferralSettingInput {
		isEnabled: Boolean
		perUserLimit: Int
		newReferralCredit: Float
		userBecomeGuestCredit: Float
		userBecomeHostCredit: Float
	}

	input GlobalSettingInput {
		siteName: String
		version: String
		appVersion: String
		forceUpdate: Boolean
		maintenance: Boolean
		appMaintenance: Boolean
		siteUrl: String
		vendorUrl: String
		playStore: String
		appStore: String
		adminUrl: String
		startingYear: String
		timezone: String
		localUrl: Boolean
		defaultUploadDriver: String
		supportNumber: String
		supportEmail: String
		defaultCurrency: String
		defaultLanguage: String
		currencyFormat: String
		dateFormat: String
		minPrice: String
		maxPrice: String
		maxRooms: Int
		maxAdults: Int
		maxChildren: Int
		logo: Upload
		secondaryLogo: Upload
		favicon: Upload
		footerImage: Upload
		headCode: String
		footCode: String
		smsProvider: String
		mapProvider: String
		autocompleteProvider: String
		userInactiveDays: Int
		defaultUserStatus: String
		defaultListingStatus: String
		defaultExperienceStatus: String
		backupPeriod: String
		autoPayout: Boolean
		otpEnabled: Boolean
		disputeDefaultApproval: Boolean
		copyrightLink: String
		copyrightText: String
		maxReviewDays: Int
		payoutHoldDays: Int
		maxGuestDisputeDays: Int
		maxHostDisputeDays: Int
		referralSetting: ReferralSettingInput
		hostCoupon: Boolean
	}
`;

export default globalSettingType;
