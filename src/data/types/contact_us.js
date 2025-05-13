import { gql } from "apollo-server-express";

const contactUsType = gql`
	type ContactUs {
		id: Int!
		name: String
		email: String
		feedback: String
		adminFeedback: String
		createdAt: String
		updatedAt: String
	}
`;

export default contactUsType;
