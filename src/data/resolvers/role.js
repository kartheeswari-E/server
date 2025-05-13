import { gql } from "apollo-server-express";
import Role from "../models/role.js";
import Permission from "../models/permission.js";

export const roleTypeDef = gql`
	type Query {
		getRoles(filters: JSON): [Role]
		getRole(id: Int): Role
		getPermissions: [Permission]
		getPermission(id: Int): Permission
	}
	type Mutation {
		createRole(input: RoleInput!): Boolean
		updateRole(id: Int!, input: RoleInput): Boolean
		deleteRole(id: Int!): Boolean
	}
`;

const roleQueryDef = {
	getRoles: async (_, { filters = {} }) => {
		const roles = await Role.find(filters);
		return roles;
	},
	getRole: async (_, { id }) => {
		const role = await Role.findOne({ id });
		return role;
	},
	getPermissions: async (_) => {
		const permissions = await Permission.find({});
		return permissions;
	},
	getPermission: async (_, { id }) => {
		return await Permission.findOne({ id });
	},
};

const roleMutationDef = {
	createRole: async (_, { input }) => {
		const role = new Role(input);
		try {
			const value = await role.save();

			return true;
		} catch (e) {
			return false;
		}
	},
	updateRole: async (_, { id, input }) => {
		const role = await Role.findOne({ id });

		if (!role) {
			throw new Error("Role not found");
		}

		Object.assign(role, input);
		try {
			await role.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteRole: async (_, { id }) => {
		const result = await Role.findOneAndDelete({ id });
		return result !== null; // Returns true if a document was deleted, false otherwise
	},
};

const roleResolver = {
	Query: roleQueryDef,
	Mutation: roleMutationDef,
};

export default roleResolver;
