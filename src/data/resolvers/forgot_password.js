import crypto from "crypto";
import bcrypt from "bcrypt";

import { gql } from "apollo-server-express";

import Admin from "../models/admin.js";
import contactUsResolver from "./contact_us.js";

export const adminForgotTypeDef = gql`
	type Mutation {
		sendOtpAdmin(email: String!): ResponseSendOtp
		verifyOtpAdmin(email: String!, otp: String!): Response
		updatePasswordAdmin(email: String!, newPassword: String!): Response
	}
`;

let otpStore = {};

const adminMutationDef = {
	sendOtpAdmin: async (_, { email }) => {
		try {
			const admin = await Admin.findOne({ email });

			if (admin) {
				const otp = crypto.randomInt(100000, 999999).toString();
				otpStore[email] = otp;

				const mailOptions = {
					email,
					subject: "Password Reset OTP Sent",
					htmlContent: `<h3>Hi ${admin.firstName},</h3>

<p>You have requested a password reset for your account. Please use the following One-Time Password (OTP) to complete the process:</p>

<p>OTP: <b>${otp}</b></p>

<p>Please enter this OTP on the reset password page to proceed with resetting your password.</p>

<p>Regards,</p>

<p>madurai connect</p>`,
				};

				const returnData = {
					success: true,
					message: "OTP sent successfully",
					verify_code: otp,
				};

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

	verifyOtpAdmin: (_, { email, otp }) => {
		if (otpStore[email] === otp) {
			// delete otpStore[email];
			return { success: true, message: "OTP verified successfully" };
		} else {
			return { success: false, message: "Invalid OTP" };
		}
	},

	updatePasswordAdmin: async (_, { email, newPassword }) => {
		const admin = await Admin.findOne({ email });
		if (!admin) {
			throw new Error("admin not found");
		}

		try {
			const hashedPassword = await bcrypt.hash(newPassword, 10);
			await Admin.findOneAndUpdate({ email }, { password: hashedPassword });
			return { success: true, message: "Password updated successfully" };
		} catch (error) {
			throw new Error(`Error updating password: ${error.message}`);
		}
	},
};

const adminForgotPasswordResolver = {
	Mutation: adminMutationDef,
};

export default adminForgotPasswordResolver;
