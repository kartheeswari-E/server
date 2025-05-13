import { gql } from "apollo-server-express";
import { compare, genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import uploadFile from "../../utils/file_uploader.js";
import emailManagementResolver from "./email_management.js";
import GlobalSetting from "../models/global_setting.js";
import crypto from "crypto";
import moment from "moment";

export const userTypeDef = gql`
	type Query {
		getUsers(filters: JSON): [User]
		getUser(id: Int): User
		getUserProfile: UserProfile
	}
	type Mutation {
		createUser(input: UserInput): UserProfile
		updateUser(id: Int!, input: UserInput): UserProfile
		deleteUser(id: Int!): Boolean
		authenticateUser(email: String!, password: String!, rememberMe: Boolean): UserProfile
		refreshToken(refreshToken: String!): RefreshToken
		userLogout(authorization: String!): LogoutInput!
		deleteUserPhoto(id: Int!): String
		verifyUserEmail(email: String!, otp: String!): Response
	}
`;

const verifyRefreshToken = (token) => {
	try {
		return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
	} catch (error) {
		throw new Error("Invalid token");
	}
};

const tokenBlacklist = new Set();

let otpStore = {};

const userQueryDef = {
	getUsers: async (_, { filters }) => {
		const users = await User.find({ ...filters, deletedAt: null }).populate("payoutMethodList");
		return users;
	},
	getUser: async (_, { id }) => {
		const user = await User.findOne({ id }).populate("payoutMethodList");

		return { ...user.toObject(), payoutMethods: user?.payoutMethodList };
	},
	getUserProfile: async (parent, args, context) => {
		if (!context.user && context.user.type !== "user") {
			throw new Error("Not authenticated");
		}
		const user = await User.findOne({ email: context.user.email }).populate("payoutMethodList");
		if (!user) {
			throw new Error("User not found");
		}

		if (user.status != "active") {
			throw new Error("Account is not active");
		}
		const token = context.headers.authorization.substring(7);

		if (tokenBlacklist.has(token)) {
			throw new Error("Token is blacklisted");
		}

		const data = { ...user.toJSON(), token: token };
		return data;
	},
};

const userMutationDef = {
	createUser: async (_, { input }) => {
		var mergeInput = {};

		const checkUser = await User.findOne({ email: input.email });

		if (checkUser) {
			throw new Error("User already exists");
		}

		const globalSettings = await GlobalSetting.findOne();
		mergeInput["status"] = globalSettings.defaultUserStatus;

		if (input["image"] != null) {
			let options = {
				uploadPath: "users",
				namePrefix: "user_",
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

		const user = new User(data);
		try {
			await user.save();
			const token = jwt.sign({ type: "user", userId: user.id, email: user.email }, `${process.env.SECRET}`, {
				expiresIn: "1d",
			});
			const data = { ...user.toJSON(), token: token };
			let otp = "";
			if (user.status !== "active") {
				otp = crypto.randomInt(100000, 999999).toString();
				otpStore[user.email] = otp;
			}
			const emailContent = {
				templateId: 2,
				data: {
					name: input.firstName,
					otp: otp,
					status: user.status == "active" ? true : false,
				},
				subject: user.status == "active" ? "Welcome Mail Hyra Space" : "Please confirm your email address",
				recipient: input.email,
			};
			const sendEmail = await emailManagementResolver.Mutation.sendEmailTemplate(_, emailContent);
			return data;
		} catch (e) {
			console.log("error", e);
			throw new Error("Failed to Create User");
		}
	},
	updateUser: async (_, { id, input }) => {
		try {
			// Retrieve the existing user data
			const user = await User.findOne({ id });
			if (!user) {
				throw new Error("User not found");
			}

			// Build the update object
			const updateData = {
				...input, // Merge other fields from input
				document: {
					...user.document, // Start with the existing document data
					...input.document, // Merge provided document updates
				},
			};

			// Check if a new profile image is provided
			if (input.image) {
				const options = {
					uploadPath: "users",
					namePrefix: "user_",
					addTime: true,
				};
				const result = await uploadFile(input.image, options);
				updateData.image = {
					src: result.name,
					uploadDriver: result.uploadDriver,
					uploadDir: result.uploadDir,
				};
			}

			// Check if a new document image is provided
			if (input.document?.image) {
				const options = {
					uploadPath: "users",
					namePrefix: "user_document_",
					addTime: true,
				};
				const result = await uploadFile(input.document.image, options);
				updateData.document.image = {
					src: result.name,
					uploadDriver: result.uploadDriver,
					uploadDir: result.uploadDir,
				};
			}

			if (input.password) {
				const salt = await genSalt(10);
				updateData.password = await hash(input.password, salt);
			}
			// Use findOneAndUpdate to perform the update
			const updatedUser = await User.findOneAndUpdate(
				{ id },
				{ $set: updateData },
				{ new: true, runValidators: true }, // Return updated document and validate
			);

			if (input.password) {
				const emailContent = {
					templateId: 3,
					data: {
						when: moment().format("DD/MM/YYYY"),
					},
					subject: "Account activity:password changed",
					recipient: updatedUser.email,
				};
				const sendEmail = await emailManagementResolver.Mutation.sendEmailTemplate(_, emailContent);
			}
			return updatedUser.toJSON();
		} catch (e) {
			console.log("user error", e);
			throw new Error("Failed to update user");
		}
	},

	deleteUser: async (_, { id }, context) => {
		const user = await User.findOne({ id });

		if (!user) {
			throw new Error("User  not found");
		}
		if (!context.user && context.user.type !== "admin") {
			if (user.id !== context.user.userId) {
				throw new Error("You are not authorized to delete this user");
			}
		}

		const result = await User.findOneAndUpdate(
			{ id },
			{
				$set: {
					email: user.firstName + id,
					deletedAt: new Date(),
					deletedData: user.email,
				},
			},
		);

		return result !== null; // returns true if user was found and updated, false otherwise
	},
	authenticateUser: async (_, { email, password, rememberMe = false }) => {
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error("User not found");
		}
		const valid = await compare(password, user.password);

		if (!valid) {
			throw new Error("Invalid password");
		}
		if (user.status == "inactive") {
			throw new Error("User is Inactive");
		}
		if (user.status == "pending") {
			const otp = crypto.randomInt(100000, 999999).toString();
			otpStore[email] = otp;

			const emailContent = {
				templateId: 2,
				data: {
					name: user.firstName,
					otp: otp,
					status: false,
				},
				subject: "Please confirm your email address",
				recipient: user.email,
			};
			const sendEmail = await emailManagementResolver.Mutation.sendEmailTemplate(_, emailContent);
		}

		const token = jwt.sign({ userId: user.id, email: user.email, type: "user" }, `${process.env.SECRET}`, {
			expiresIn: "1d",
		});

		const refreshToken = jwt.sign(
			{ userId: user.id, email: user.email, password: user.password, type: "user" },
			`${process.env.REFRESH_TOKEN_SECRET}`,
			{ expiresIn: rememberMe ? "30d" : "7d" },
		);

		const data = { ...user.toJSON(), token: token, refreshToken: "" };

		if (rememberMe) {
			data.refreshToken = refreshToken; // Only add refresh token if rememberMe is true
		}
		return data;
	},
	refreshToken: async (_, { refreshToken }) => {
		try {
			const decoded = verifyRefreshToken(refreshToken);

			const user = await User.findOne({ id: decoded.userId });
			if (!user) {
				throw new Error("User not found");
			}

			return { email: user.email, password: user.password, rememberMe: true };
		} catch (error) {
			throw new Error("Invalid or expired");
		}
	},
	userLogout: async (_, { authorization }) => {
		let response = {
			success: false,
			message: "Internal Server Error",
		};

		try {
			if (!authorization) {
				throw new Error("Authorization header is missing");
			}

			const token = authorization.replace("Bearer ", "");
			if (!token) {
				throw new Error("Token is missing");
			}

			// Add the token to the blacklist
			tokenBlacklist.add(token);

			response = {
				success: true,
				message: "Successfully logged out",
			};

			return response;
		} catch (error) {
			response.message = error.message;
			throw new Error(response.message);
		}
	},
	deleteUserPhoto: async (_, { id }) => {
		try {
			const user = await User.findOne({ id });
			if (user) {
				user.image = {
					src: "",
					uploadDriver: 0,
					uploadDir: "",
				};

				await user.save();

				return "User photo deleted successfully";
			} else {
				throw new Error("User not found");
			}
		} catch (error) {
			throw new Error("Failed to update user");
		}
	},
	verifyUserEmail: async (_, { email, otp }) => {
		if (otpStore[email] === otp) {
			delete otpStore[email];
			const result = await User.findOneAndUpdate(
				{ email },
				{
					$set: {
						status: "active",
					},
				},
			);
			return { success: true, message: "OTP verified successfully" };
		} else {
			return { success: false, message: "Invalid OTP" };
		}
	},
};

const userResolver = {
	Query: userQueryDef,
	Mutation: userMutationDef,
};

export default userResolver;
