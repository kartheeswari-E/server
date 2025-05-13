import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { GraphQLScalarType, Kind } from "graphql";
import moment from "moment";

const baseResolvers = {
	Upload: GraphQLUpload,
	Image: {
		path: (parent) => {
			if (parent.uploadDriver == 0) {
				let host = process.env.APP_URL;
				if (parent.src == undefined) {
					return null;
				}
				let uploadDir = parent.uploadDir != undefined ? parent.uploadDir : "";
				return host + "/images/" + uploadDir + parent.src;
			}
			return parent.src;
		},
	},
	Date: new GraphQLScalarType({
		name: "Date",
		description: "Custom Date scalar type",
		parseValue(value) {
			const parsedDate = moment(value, "YYYY-MM-DD", true);

			if (!parsedDate.isValid()) {
				throw new Error(`Invalid date format. Expected 2 'YYYY-MM-DD', received '${value}'`);
			}

			return parsedDate.toDate();
		},
		serialize(value) {
			return moment(value).format("YYYY-MM-DD");
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.STRING) {
				const parsedDate = moment(ast.value, "YYYY-MM-DD", true);

				if (!parsedDate.isValid()) {
					throw new Error(`Invalid date format. Expected 1 'YYYY-MM-DD', received '${ast.value}'`);
				}

				return parsedDate.toDate();
			}

			return null;
		},
	}),
	DateTime: new GraphQLScalarType({
		name: "DateTime",
		description: "A custom scalar type for date and time",
		serialize(value) {
			const parsedDate = moment(value, "YYYY-MM-DD", true);

			if (!parsedDate.isValid()) {
				throw new Error(`Invalid date format. Expected 2 'DD/MM/YYYY', received '${value}'`);
			}

			return parsedDate.toDate();
		},
		parseValue(value) {
			return moment(value).format("YYYY-MM-DD");
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.STRING) {
				const parsedDate = moment(ast.value, "YYYY-MM-DD HH:mm:ss", true);

				if (!parsedDate.isValid()) {
					throw new Error(`Invalid date format. Expected 1 'DD/MM/YYYY', received '${ast.value}'`);
				}

				return parsedDate.toDate();
			}

			return null;
		},
	}),
	TranslatableString: new GraphQLScalarType({
		name: "TranslatableString",
		description: "Translatable String",
		serialize(value, context) {
			if (value == null) {
				return null;
			}
			try {
				return value.get("en") ?? "";
			} catch (e) {
				return value["en"] ?? "";
			}
		},
		parseValue(value, context) {
			const { headers } = context;
			return value["en"];
		},
	}),
	ConvertableAmount: new GraphQLScalarType({
		name: "ConvertableAmount",
		description: "Convertable Amount",
		serialize(value) {
			return value;
		},
		parseValue(value) {
			return value;
		},
	}),
};

export default baseResolvers;
