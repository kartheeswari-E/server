import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import { gql } from "apollo-server-express";
import emailManagementResolver from "./email_management.js";
import moment from "moment";

export const userForgotTypeDef = gql`
	type Mutation {
		sendOtpUser(email: String!): ResponseSendOtp
		verifyOtpUser(email: String!, otp: String!): Response
		updatePasswordUser(email: String!, newPassword: String!): Response
	}
`;

let otpStore = {};

const userMutationDef = {
	sendOtpUser: async (_, { email }) => {
		try {
			const user = await User.findOne({ email });

			if (user) {
				const otp = crypto.randomInt(100000, 999999).toString();
				otpStore[email] = otp;

				const returnData = {
					success: true,
					message: "OTP sent successfully",
					verify_code: otp,
				};

				const emailContent = {
					templateId: 4,
					data: {
						name: user?.firstName,
						otp: otp,
					},
					subject: "Reset Your Password",
					recipient: email,
				};
				const sendEmail = await emailManagementResolver.Mutation.sendEmailTemplate(_, emailContent);

				return returnData;
			} else {
				return {
					success: false,
					message: "It Seems This email not registered. Please signup to continue",
					verify_code: "",
				};
			}
		} catch (error) {
			console.error("Error sending OTP:", error);
		}
	},

	verifyOtpUser: (_, { email, otp }) => {
		if (otpStore[email] === otp) {
			// delete otpStore[email];
			return { success: true, message: "OTP verified successfully" };
		} else {
			return { success: false, message: "Invalid OTP" };
		}
	},

	updatePasswordUser: async (_, { email, newPassword }) => {
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error("User not found");
		}

		try {
			const hashedPassword = await bcrypt.hash(newPassword, 10);
			await User.findOneAndUpdate({ email }, { password: hashedPassword });

			const emailContent = {
				templateId: 3,
				data: {
					when: moment().format("DD/MM/YYYY"),
					where: "",
					device: "",
				},
				subject: "Account activity:password changed",
				recipient: email,
			};
			const sendEmail = await emailManagementResolver.Mutation.sendEmailTemplate(_, emailContent);

			return { success: true, message: "Password updated successfully" };
		} catch (error) {
			throw new Error(`Error updating password: ${error.message}`);
		}
	},
};

const userForgotPasswordResolver = {
	Mutation: userMutationDef,
};

export default userForgotPasswordResolver;
