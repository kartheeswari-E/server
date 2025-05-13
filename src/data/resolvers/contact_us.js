import nodemailer from "nodemailer";
import ContactUs from "../models/contact_us.js";

import { gql } from "apollo-server-express";
import Admin from "../models/admin.js";
import emailManagementResolver from "./email_management.js";

export const contactUsTypeDef = gql`
	type Query {
		getContactUs(id: Int!): ContactUs
		getContactUss: [ContactUs]
	}

	type Mutation {
		createContactUs(name: String!, email: String!, feedback: String!): ContactUs
		updateContactUs(id: Int!, adminFeedback: String!): ContactUs
	}
`;

const contactUsQueryDef = {
	getContactUs: async (_, { id }) => {
		try {
			const contactUs = await ContactUs.findOne({ id });
			return contactUs;
		} catch (error) {
			throw new Error("Error fetching contact us entry");
		}
	},
	getContactUss: async (_) => {
		try {
			const contactUs = await ContactUs.find({});
			return contactUs;
		} catch (error) {
			throw new Error("Error fetching contact us entry");
		}
	},
};

const contactUsMutationDef = {
	createContactUs: async (_, { name, email, feedback }) => {
		try {
			const admins = await Admin.find({}).select("email");

			const adminEmail = admins.map((data) => {
				return data.email;
			});
			const newContactUs = new ContactUs({ name, email, feedback });
			await newContactUs.save();

			const emailContent = {
				templateId: 1,
				data: {
					name: name,
					email: email,
					feedback: feedback,
					subject: `Contact us from ${name}`,
				},
				subject: `Contact us from ${name}`,
				recipient: adminEmail,
			};
			const sendEmail = await emailManagementResolver.Mutation.sendEmailTemplate(_, emailContent);

			return newContactUs;
		} catch (error) {
			console.error(error);
			throw new Error("Error creating contact us entry");
		}
	},
	updateContactUs: async (_, { id, adminFeedback }) => {
		try {
			const contactUs = await ContactUs.findOneAndUpdate({ id }, { adminFeedback }, { new: true });
			return contactUs;
		} catch (error) {
			throw new Error("Error updating contact us entry");
		}
	},
};

const contactUsResolver = {
	Query: contactUsQueryDef,
	Mutation: contactUsMutationDef,
};

export default contactUsResolver;
