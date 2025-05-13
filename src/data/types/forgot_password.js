import { gql } from "apollo-server-express";

const adminForgotPasswordTypes = gql`
	type Response {
		success: Boolean!
		message: String!
	}
	type ResponseSendOtp {
		success: Boolean!
		message: String!
		verify_code: String!
	}
`;

export default adminForgotPasswordTypes;
