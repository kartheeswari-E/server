import { gql } from "apollo-server-express";
import Handlebars from "handlebars";
import nodemailer from "nodemailer";
import EmailManagement from "../models/email_management.js";
import Credential from "../models/credential.js";
import GlobalSetting from "../models/global_setting.js";
import { requestDeclined, requestExpired, requestPreAccepted, specialOfferSent } from "../../services/email_management_service.js";

export const emailManagementTypeDef = gql`
	type Query {
		getEmailTemplates(filters: JSON): [EmailTemplate]
		getEmailTemplate(id: Int!): EmailTemplate
	}

	type Mutation {
		createEmailTemplate(input: EmailTemplateInput!): Boolean
		updateEmailTemplate(id: Int!, input: EmailTemplateInput!): Boolean
		deleteEmailTemplate(id: Int!): Boolean
		sendEmailTemplate(templateId: Int!, data: JSON!, recipient: [String]!, subject: String): Boolean
	}
`;

const emailManagementQueryDef = {
	getEmailTemplates: async (_, { filters }, context) => {
		const templates = await EmailManagement.find(filters || {});

		return templates;
	},
	getEmailTemplate: async (_, { id }, context) => {
		const template = await EmailManagement.findOne({ id });
		if (!template) {
			throw new Error("Email template not found");
		}
		return template;
	},
};

const emailManagementMutationDef = {
	createEmailTemplate: async (_, { input }, context) => {
		if (!context.user || context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}

		const template = new EmailManagement(input);
		try {
			await template.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateEmailTemplate: async (_, { id, input }, context) => {
		if (!context.user || context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}

		const template = await EmailManagement.findOne({ id });
		if (!template) {
			throw new Error("Email template not found");
		}

		Object.assign(template, input);
		try {
			await template.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	deleteEmailTemplate: async (_, { id }, context) => {
		if (!context.user || context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}

		const result = await EmailManagement.findOneAndDelete({ id });
		return result != null;
	},
	sendEmailTemplate: async (_, { templateId, data, recipient, subject }, context) => {
		const template = await EmailManagement.findOne({ id: templateId });
		if (!template) {
			throw new Error("Email template not found");
		}

		if (template.status == false) return;
		const credentials = await Credential.findOne({});
		const globalSettings = await GlobalSetting.findOne({});
		let host = process.env.APP_URL;

		const emailData = {
			...data,
			website_url: "",
			logo_url: host + "/images/" + (globalSettings.logo.uploadDir ? globalSettings.logo.uploadDir : "") + globalSettings.logo.src,
			facebook_url: globalSettings.socialMediaLinks.facebook,
			facebook_image: host + "/images/facebook.png",
			instagram_url: globalSettings.socialMediaLinks.instagram,
			instagram_image: host + "/images/logo_instagram.png",
			twitter_url: globalSettings.socialMediaLinks.twitter,
			twitter_image: host + "/images/twitter.png",
			youtube_url: globalSettings.socialMediaLinks.youtube,
			youtube_image: host + "/images/logo_youtube.png",
			linkedin_url: globalSettings.socialMediaLinks.linkedin,
			linkedin_image: host + "/images/logo_linkedin.png",
			pintrest_url: globalSettings.socialMediaLinks.pinterest,
			pintrest_image: host + "/images/pinterest.png",
			help_center_url: "",
			contact_us_url: "",
		};
		// Compile the template with Handlebars
		const compiledTemplate = Handlebars.compile(template.htmlContent);
		const htmlContent = compiledTemplate(emailData);

		// Set up Nodemailer transporter
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.MAIL,
				pass: process.env.MAIL_PASSWORD,
			},
		});

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: recipient,
			subject: subject,
			html: htmlContent,
		};

		try {
			await transporter.sendMail(mailOptions);
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	},
};

const emailManagementResolver = {
	Query: emailManagementQueryDef,
	Mutation: emailManagementMutationDef,
};

export default emailManagementResolver;
