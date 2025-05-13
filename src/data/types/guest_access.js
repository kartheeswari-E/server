import { gql } from "apollo-server-express";

const guestAccessType = gql`
	type GuestAccess {
		id: Int
		name: TranslatableString
		description: TranslatableString
		status: Boolean
		createdAt: Date
		updatedAt: Date
	}

	input GuestAccessInput {
		name: JSON
		description: JSON
		status: Boolean
	}
`;

export default guestAccessType;
