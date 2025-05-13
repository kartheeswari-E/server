import { gql } from "apollo-server-express";

const baseTypeDefs = gql`
	scalar Date
	scalar DateTime
	scalar JSON
	scalar Upload
	scalar TranslatableString
	scalar ConvertableAmount
	type Query {
		_empty: String
	}
	type Image {
		src: String
		uploadDriver: String
		path: String
	}
	type Mutation {
		_empty: String
	}
`;

export default baseTypeDefs;
