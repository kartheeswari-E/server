import { gql } from "apollo-server-express";

const userForgotPasswordSchema = gql`
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

export default userForgotPasswordSchema;
