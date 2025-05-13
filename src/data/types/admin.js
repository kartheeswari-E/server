import { gql } from "apollo-server-express";

const adminTypes = gql`
	type AdminUser {
		id: Int
		name: String

		email: String
		roleId: Int
		phoneNumber: String
		password: String
		countryCode: String
		phoneCode: String
		timezone: String
		userLanguage: String
		userCurrency: String
		image: Image
		primary: Boolean
		status: Boolean
		deletedData: String
		deletedAt: String
		createdAt: DateTime
		updatedAt: DateTime
	}

	type AdminProfile {
		id: Int
		name: String
		email: String
		roleId: Int
		phoneNumber: String
		countryCode: String
		phoneCode: String
		timezone: String
		userLanguage: String
		userCurrency: String
		image: Image
		primary: Boolean
		status: Boolean
		createdAt: DateTime
		updatedAt: DateTime
		token: String
		refreshAdminToken: String
	}

	input AdminUserInput {
		name: String
		email: String
		roleId: Int
		phoneNumber: String
		password: String
		countryCode: String
		phoneCode: String
		timezone: String
		userLanguage: String
		userCurrency: String
		image: Upload
		primary: Boolean
		status: Boolean
	}

	type refreshAdminToken {
		email: String
		password: String
		rememberMe: Boolean
	}
`;

export default adminTypes;
