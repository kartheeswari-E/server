import { gql } from "apollo-server-express";

export const emailManagementType = gql`
	type EmailTemplate {
		id: Int
		name: String
		htmlContent: String
		status: Boolean
		createdAt: Date
		updatedAt: Date
	}

	input EmailTemplateInput {
		name: String
		htmlContent: String
		status: Boolean
	}
`;
