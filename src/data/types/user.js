import { gql } from "apollo-server-express";

const userType = gql`
	type Verifications {
		email: Boolean
		phoneNumber: Boolean
		facebook: Boolean
		google: Boolean
		apple: Boolean
		idDocument: Boolean
	}

	type PaymentMethod {
		paymentMethodId: String
		brand: String
		last4: String
		expMonth: String
		expYear: String
		createdAt: Date
	}

	type UserDocument {
		image: Image
		rejectedReason: String
		status: String
	}

	type User {
		id: Int
		stripeCustomerId: String
		userName: String
		firstName: String
		lastName: String
		email: String
		password: String
		hostStatus: Boolean
		countryCode: String
		phoneCode: String
		phoneNumber: String
		googleId: String
		facebookId: String
		appleId: String
		timezone: String
		userLanguage: String
		userCurrency: String
		dob: Date
		gender: String
		about: String
		location: String
		work: String
		languages: JSON
		image: Image
		document: UserDocument
		status: String
		rating: String
		totalRating: String
		lastActiveAt: Date
		deletedData: JSON
		deletedAt: DateTime
		verifications: Verifications
		payoutMethods: [PayoutMethod]
		paymentMethods: [PaymentMethod]
		createdAt: DateTime
		updatedAt: DateTime
	}

	type UserProfile {
		id: Int
		stripeCustomerId: String
		userName: String
		firstName: String
		lastName: String
		email: String
		hostStatus: Boolean
		countryCode: String
		phoneCode: String
		phoneNumber: String
		password: String
		googleId: String
		facebookId: String
		appleId: String
		timezone: String
		userLanguage: String
		userCurrency: String
		dob: Date
		gender: String
		about: String
		location: String
		work: String
		languages: JSON
		image: Image
		document: UserDocument
		status: String
		rating: String
		totalRating: String
		lastActiveAt: DateTime
		verifications: Verifications
		paymentMethods: [PaymentMethod]
		createdAt: DateTime
		updatedAt: DateTime
		token: String
		refreshToken: String!
	}
	input PaymentMethodInput {
		paymentMethodId: String
		brand: String
		last4: String
		expMonth: String
		expYear: String
	}
	input VerificationsInput {
		email: Boolean
		phoneNumber: Boolean
		facebook: Boolean
		google: Boolean
		apple: Boolean
		idDocument: Boolean
	}
	input UserDocumentInput {
		image: Upload
		rejectedReason: String
		status: String
	}

	input UserInput {
		firstName: String
		lastName: String
		email: String
		password: String
		image: Upload
		document: UserDocumentInput
		countryCode: String
		phoneCode: String
		phoneNumber: String
		googleId: String
		facebookId: String
		appleId: String
		timezone: String
		userLanguage: String
		userCurrency: String
		dob: Date
		gender: String
		about: String
		location: String
		work: String
		languages: JSON
		status: String
		verifications: VerificationsInput
		paymentMethods: [PaymentMethodInput]
	}

	type LogoutInput {
		success: Boolean!
		message: String!
	}

	type RefreshToken {
		email: String
		password: String
		rememberMe: Boolean
	}
`;

export default userType;
