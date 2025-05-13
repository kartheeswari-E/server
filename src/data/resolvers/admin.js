import { gql } from "apollo-server-express";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import Admin from "../models/admin.js";
import PersonalAccessToken from "../models/personal_access_token.js";
import uploadFile from "../../utils/file_uploader.js";

export const adminTypeDef = gql`
	type Query {
		getAdmins(filters: JSON): [AdminUser]
		getAdmin(id: Int): AdminUser
		getAdminProfile: AdminProfile
	}
	type Mutation {
		createAdmin(input: AdminUserInput): Boolean
		updateAdmin(id: Int!, input: AdminUserInput): Boolean
		deleteAdmin(id: Int!): Boolean
		authenticateAdmin(email: String!, password: String!, rememberMe: Boolean): AdminProfile
		refreshAdminToken(refreshAdminToken: String!): refreshAdminToken
		logoutAdmin: Boolean
	}
`;

const verifyrefreshAdminToken = (token) => {
	try {
		return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
	} catch (error) {
		throw new Error("Invalid token");
	}
};

const adminQueryDef = {
	getAdmins: async (__, { filters }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}

		const admins = await Admin.find(filters);
		return admins;
	},
	getAdmin: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}

		return await Admin.findOne({ id });
	},
	getAdminProfile: async (parent, args, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Not authenticated");
		}

		const admin = await Admin.findOne({ email: context.user.email });
		if (!admin) {
			throw new Error("User not found");
		}

		if (!admin.status) {
			throw new Error("Account is not active");
		}
		const token = context.headers.authorization.substring(7);

		const accessToken = await PersonalAccessToken.findOne({ tokenable: "Admin", token: token });
		if (!accessToken) {
			throw new Error("Invalid Token");
		}

		const data = { ...admin.toJSON(), token: token };
		return data;
	},
};

const adminMutationDef = {
	createAdmin: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}

		var mergeInput = {};
		if (input["image"] != null) {
			let options = {
				uploadPath: "admins",
				namePrefix: "admin_",
				addTime: true,
			};
			try {
				const result = await uploadFile(input["image"], options);
				mergeInput["image"] = {
					src: result.name,
					uploadDriver: result.uploadDriver,
					uploadDir: result.uploadDir,
				};
			} catch (e) {}
		}

		const data = { ...input, ...mergeInput };
		const admin = new Admin(data);
		try {
			await admin.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateAdmin: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const admin = await Admin.findOne({ id });

		if (!admin) {
			throw new Error("Admin not found");
		}
		var mergeInput = { image: admin.image };
		if (input["image"] != null) {
			let options = {
				uploadPath: "admins",
				namePrefix: "admin_",
				addTime: true,
			};
			try {
				const result = await uploadFile(input["image"], options);
				mergeInput["image"] = {
					src: result.name,
					uploadDriver: result.uploadDriver,
					uploadDir: result.uploadDir,
				};
			} catch (e) {
				mergeInput["image"] = admin.image;
			}
		}

		const data = { ...input, ...mergeInput };
		Object.assign(admin, data);
		try {
			await admin.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteAdmin: async (_, { id }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const result = await Admin.findOneAndDelete({ id });
		return result !== null; // Returns true if a document was deleted, false otherwise
	},
	authenticateAdmin: async (_, { email, password, rememberMe = false }) => {
		const admin = await Admin.findOne({ email });
		if (!admin) {
			throw new Error("User not found");
		}
		const valid = await compare(password, admin.password);
		if (!valid) {
			throw new Error("Invalid password");
		}
		if (!admin.status) {
			throw new Error("Account is not active");
		}
		const token = jwt.sign({ type: "admin", userId: admin.id, email: admin.email }, `${process.env.SECRET}`, {
			expiresIn: "1d",
		});

		await PersonalAccessToken.create({
			tokenable: "Admin",
			name: "Access Token",
			token: token,
			expiresAt: new Date(new Date().setDate(new Date().getDate() + 1)),
		});

		const refreshAdminToken = jwt.sign({ userId: admin.id, email: admin.email, password, type: "admin" }, `${process.env.REFRESH_TOKEN_SECRET}`, {
			expiresIn: "30d",
		});

		const data = {
			id: admin.id,
			name: admin.name,
			email: admin.email,
			countryCode: admin.countryCode,
			phoneCode: admin.phoneCode,
			phoneNumber: admin.phoneNumber,
			timezone: admin.timezone,
			userLanguage: admin.userLanguage,
			userCurrency: admin.userCurrency,
			imageSrc: admin.image,
			status: admin.status,
			token: token,
			refreshAdminToken: rememberMe ? refreshAdminToken : "",
		};
		return data;
	},
	refreshAdminToken: async (_, { refreshAdminToken }) => {
		try {
			const decoded = verifyrefreshAdminToken(refreshAdminToken);

			const admin = await Admin.findOne({ id: decoded.userId });
			if (!admin) {
				throw new Error("Admin not found");
			}

			return { email: admin.email, password: admin.password, rememberMe: true };
		} catch (error) {
			throw new Error("Invalid or expired");
		}
	},
	logoutAdmin: async (__, _, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Not authenticated");
		}

		const admin = await Admin.findOne({ email: context.user.email });
		if (!admin) {
			throw new Error("User not found");
		}

		if (!admin.status) {
			throw new Error("Account is not active");
		}
		const token = context.headers.authorization.substring(7);

		await PersonalAccessToken.findOneAndDelete({ tokenable: "Admin", token: token });

		return true;
	},
};

const adminResolver = {
	Query: adminQueryDef,
	Mutation: adminMutationDef,
};

export default adminResolver;
