import { gql } from "apollo-server-express";
import Help from "../models/help.js";

export const helpTypeDef = gql`
	type Query {
		getHelpById(id: Int!): Help
		getAllHelps(filters: JSON): [Help]
		getNestedHelp(helpId: Int!, nestedHelpId: Int!): NestedHelp
		getNestedHelps(helpId: Int!): [NestedHelp]
	}
	type Mutation {
		createHelp(input: HelpInput!): Help
		updateHelp(id: Int!, input: HelpInput!): Help
		deleteHelp(id: Int!): String
		createNestedHelp(helpId: Int!, input: NestedHelpInput!): Help
		updateNestedHelp(helpId: Int!, nestedHelpId: Int!, toHelpId: Int!, input: NestedHelpInput!): Help
		deleteNestedHelp(helpId: Int!, nestedHelpId: Int!): Help
	}
`;

function generateSlug(name) {
	return name?.toLowerCase()?.replace(/\s+/g, "-");
}

const generateUniqueNestedHelpId = (nestedHelps) => {
	const maxId = nestedHelps.reduce((max, nestedHelp) => {
		return nestedHelp.id > max ? nestedHelp.id : max;
	}, 0);

	return maxId + 1;
};

const helpQueryDef = {
	getAllHelps: async (_, { filters }) => {
		try {
			const help = await Help.find(filters);
			if (!help) {
				throw new Error("Help not found");
			}
			return help;
		} catch (err) {
			throw new Error(err);
		}
	},

	getHelpById: async (_, { id }) => {
		try {
			const help = await Help.find();
			if (!help) {
				throw new Error("Help not found");
			}
			return help.find((help) => help.id === id);
		} catch (err) {
			throw new Error(err);
		}
	},
	getNestedHelp: async (_, { helpId, nestedHelpId }) => {
		try {
			const help = await Help.findOne({ id: helpId });
			return help?.helps ? help?.helps.find((nestedHelp) => nestedHelp.id === nestedHelpId) : undefined;
		} catch (error) {
			throw new Error(error);
		}
	},
	getNestedHelps: async (_, { helpId }) => {
		try {
			const help = await Help.findOne({ id: helpId });
			return help.helps;
		} catch (error) {
			throw new Error(error);
		}
	},
};

const helpMutationDef = {
	createHelp: async (_, { input }) => {
		try {
			const help = new Help({
				category: input.category,
				categoryType: input.categoryType,
				description: input.description,
				slug: input.slug ? input.slug : generateSlug(input.title.en),
				status: input.status,
				title: input.title,
			});

			const savedHelp = await help.save();
			return savedHelp; // Return the saved help object with populated fields
		} catch (error) {
			throw error; // Throw the error to be caught by GraphQL resolver
		}
	},

	updateHelp: async (_, { id, input }) => {
		return await Help.findOneAndUpdate({ id: id }, { ...input }, { new: true });
	},
	deleteHelp: async (_, { id }) => {
		try {
			const deletedHelp = await Help.findOneAndDelete({ id });

			if (!deletedHelp) {
				throw new Error("Help not found");
			}

			return `Help with id ${id} deleted successfully`;
		} catch (err) {
			throw new Error(err);
		}
	},
	createNestedHelp: async (_, { helpId, input }) => {
		try {
			const help = await Help.findOne({ id: helpId });
			const shortHelp = help?.helps?.length > 0 ? help?.helps?.sort((a, b) => b.id - a.id) : 1;
			const lastHelp = shortHelp?.[0];
			const newNestedHelp = {
				id: help?.helps?.length > 0 ? lastHelp.id + 1 : 1,
				...input,
				slug: generateSlug(input.title.en),
			};

			help?.helps?.push(newNestedHelp);
			await help.save();
			return help;
		} catch (error) {
			throw new Error(error);
		}
	},
	updateNestedHelp: async (_, { helpId, nestedHelpId, toHelpId, input }) => {
		try {
			// Find the source help document
			const sourceHelp = await Help.findOne({ id: helpId });
			if (!sourceHelp) throw new Error(`Source help with ID ${helpId} not found`);

			// Find the target help document
			const targetHelp = await Help.findOne({ id: toHelpId });
			if (!targetHelp) throw new Error(`Target help with ID ${toHelpId} not found`);

			if (helpId === toHelpId) {
				// Update the nested help in place
				const nestedHelpIndex = sourceHelp.helps.findIndex((nestedHelp) => nestedHelp.id === nestedHelpId);
				if (nestedHelpIndex === -1) throw new Error(`Nested help with ID ${nestedHelpId} not found in source help`);

				sourceHelp.helps[nestedHelpIndex] = {
					...sourceHelp.helps[nestedHelpIndex],
					...input,
					id: nestedHelpId,
				};
				await sourceHelp.save();
				return sourceHelp;
			} else {
				// Remove from source and add to target
				const nestedHelpIndex = sourceHelp.helps.findIndex((nestedHelp) => nestedHelp.id === nestedHelpId);
				if (nestedHelpIndex === -1) throw new Error(`Nested help with ID ${nestedHelpId} not found in source help`);

				const nestedHelp = { ...sourceHelp.helps[nestedHelpIndex], ...input };
				sourceHelp.helps.splice(nestedHelpIndex, 1);

				// Generate a unique ID for the nested help in the target document
				const newNestedHelpId = generateUniqueNestedHelpId(targetHelp.helps);
				const updatedNestedHelp = { ...nestedHelp, id: newNestedHelpId };

				targetHelp.helps.push(updatedNestedHelp);

				await sourceHelp.save();
				await targetHelp.save();

				return targetHelp;
			}
		} catch (error) {
			throw new Error(error.message);
		}
	},

	deleteNestedHelp: async (_, { helpId, nestedHelpId }) => {
		try {
			const help = await Help.findOne({ id: helpId });

			if (!help.id) throw new Error(`Help with ID ${helpId} not found`);

			const nestedHelpIndex = help.helps.findIndex((nestedHelp) => nestedHelp.id === nestedHelpId);
			if (nestedHelpIndex === -1) throw new Error(`Nested help with ID ${nestedHelpId} not found`);

			help.helps.splice(nestedHelpIndex, 1);
			await help.save();
			return help;
		} catch (error) {
			throw new Error(error.message);
		}
	},
};

const helpResolver = {
	Query: helpQueryDef,
	Mutation: helpMutationDef,
};

export default helpResolver;
