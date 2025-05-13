import { gql } from "apollo-server-express";

const otherTypes = gql`
	type EmailSend {
		message: String!
	}
	type EmailResponse {
		success: Boolean!
		message: String!
	}
	type Response {
		success: Boolean!
		message: String!
	}
	type ResponseSendOtp {
		success: Boolean!
		message: String!
		verify_code: String!
	}
	type PaymentIntentResponse {
		status: Boolean
		clientSecret: String
	}
	type ReportResponse {
		spaces: [SpaceReportType]
		users: [UserReportType]
		reservations: [ReservationReportType]
		transactions: [TransactionReportType]
		filter_text: String!
	}

	type SpaceReportType {
		id: Int
		name: TranslatableString
		userName: String
		spaceTypeName: TranslatableString
		status: String
		adminStatus: String
		createdAt: String
	}

	type ReservationReportType {
		id: Int
		spaceName: TranslatableString
		guestName: String
		hostName: String
		total: Float
		status: String
		bookedAt: String
	}
	type TransactionReportType {
		id: Int
		guestName: String
		type: String
		paymentMethod: String
		transactionId: String
		amount: Float
		createdAt: String
	}
	type UserReportType {
		id: Int
		firstName: String
		lastName: String
		email: String
		status: String
		createdAt: String
	}
`;
export default otherTypes;
