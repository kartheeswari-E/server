import { gql } from "apollo-server-express";

const blogType = gql`
	type Blog {
		id: Int
		slug: String
		title: TranslatableString
		description: TranslatableString
		image: Image
		blogs: [NestedBlog]
		isPopular: Boolean
		status: Boolean
		createdAt: DateTime
		updatedAt: DateTime
	}

	type NestedBlog {
		id: Int
		slug: String
		title: TranslatableString
		content: TranslatableString
		tags: String
		isPopular: Boolean
		status: Boolean
		createdAt: DateTime
		updatedAt: DateTime
	}

	input ImageInputBlog {
		src: Upload
		uploadDriver: Int
	}

	input NestedBlogInput {
		slug: String
		title: JSON
		content: JSON
		tags: String
		isPopular: Boolean
		status: Boolean
	}

	input BlogInput {
		slug: String
		title: JSON
		description: JSON
		image: Upload
		isPopular: Boolean
		status: Boolean
	}
`;

export default blogType;
