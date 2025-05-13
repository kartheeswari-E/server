import { gql } from "apollo-server-express";

const roleType = gql`
	type Permission {
		id: Int
		name: String
		displayName: String
		description: String
	}

	type Role {
		id: Int
		name: String
		description: String
		permissions: [Int]
		status: Boolean
		createdAt: DateTime
		updatedAt: DateTime
	}

	input RoleInput {
		name: String
		description: String
		status: Boolean
		permissions: [Int]
	}
`;

export default roleType;
