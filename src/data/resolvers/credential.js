import { gql } from "apollo-server-express";
import Credential from "../models/credential.js";
import uploadFile from "../../utils/file_uploader.js";
import uploadServiceAccountJson from "../../utils/upload_service_account.js";

export const credentialTypeDef = gql`
	type Query {
		getCredentials: Credential
	}
	type Mutation {
		updateCredentials(type: String!, input: CredentialInput): Boolean
		updateEmailConfigCredential(id: Int, input: EmailConfigInput): Boolean
		updateGoogleMapCredential(input: GoogleMapInput): Boolean
		updateMapBoxCredential(input: MapBoxInput): Boolean
		updateGoogleCredential(input: GoogleInput): Boolean
		updateFacebookCredential(input: FacebookInput): Boolean
		updateAppleCredential(input: AppleInput): Boolean
		updateStripeCredential(input: StripeInput): Boolean
		updateCloudinaryCredential(input: CloudinaryInput): Boolean
		updateAwsCredential(input: AwsInput): Boolean
		updateTwilioCredential(input: TwilioInput): Boolean
		updateVonageCredential(input: VonageInput): Boolean
		updateReCaptchaCredential(id: Int, input: ReCaptchaInput): Boolean
		updateFirebaseCredential(id: Int, input: FirebaseInput): Boolean
	}
`;

const credentialQueryDef = {
	getCredentials: async (_) => {
		const credentials = await Credential.findOne({});
		return credentials;
	},
};

const credentialMutationDef = {
	updateCredentials: async (_, { type, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const credentials = await Credential.findOne({});

		if (!credentials) {
			throw new Error("Credential not found");
		}

		if (type == "firebase") {
			if (input.firebase["serviceAccount"]) {
				try {
					const result = await uploadServiceAccountJson(input.firebase["serviceAccount"]);

					input.firebase["serviceAccount"] = {
						src: "serviceAccount.json",
						uploadDriver: 0,
						uploadDir: "credentials/",
					};
				} catch (e) {
					input.firebase["serviceAccount"] = credentials.firebase.serviceAccount;
				}
			} else {
				input.firebase["serviceAccount"] = credentials.firebase["serviceAccount"];
			}
		} else if (type == "apple") {
			if (input.apple["keyFile"]) {
				let options = {
					namePrefix: "key_",
					addTime: true,
				};
				try {
					const result = await uploadFile(input.apple["keyFile"], options, credentials);

					input.apple["keyFile"] = {
						src: result.name,
						uploadDriver: result.uploadDriver,
						uploadDir: result.uploadDir,
					};
				} catch (e) {
					input.apple["keyFile"] = credential.apple.keyFile;
				}
			} else {
				input.apple["keyFile"] = credentials.apple["keyFile"];
			}
		}

		try {
			Object.assign(credentials, input);
			await credentials.save();
			return true;
		} catch (e) {}

		return false;
	},
	updateEmailConfigCredential: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}

		const credential = await Credential.findOne({ id });

		if (!credential) {
			throw new Error("Credential not found");
		}

		Object.assign(credential.emailConfig, input);

		try {
			await credential.save();

			return true;
		} catch (e) {
			return false;
		}
	},
	updateGoogleMapCredential: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const credential = await Credential.findOne({ id });

		if (!credential) {
			throw new Error("Credential not found");
		}
		Object.assign(credential, input);
		try {
			await credential.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateMapBoxCredential: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const credential = await Credential.findOne({ id });

		if (!credential) {
			throw new Error("Credential not found");
		}
		Object.assign(credential, input);
		try {
			await credential.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateGoogleCredential: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const credential = await Credential.findOne({ id });

		if (!credential) {
			throw new Error("Credential not found");
		}
		Object.assign(credential, input);
		try {
			await credential.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateFacebookCredential: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const credential = await Credential.findOne({ id });

		if (!credential) {
			throw new Error("Credential not found");
		}
		Object.assign(credential, input);
		try {
			await credential.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateAppleCredential: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const credential = await Credential.findOne({ id });

		if (!credential) {
			throw new Error("Credential not found");
		}
		Object.assign(credential, input);
		try {
			await credential.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateStripeCredential: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const credential = await Credential.findOne({ id });

		if (!credential) {
			throw new Error("Credential not found");
		}
		Object.assign(credential, input);
		try {
			await credential.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateCloudinaryCredential: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const credential = await Credential.findOne({ id });

		if (!credential) {
			throw new Error("Credential not found");
		}
		Object.assign(credential, input);
		try {
			await credential.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateAwsCredential: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const credential = await Credential.findOne({ id });

		if (!credential) {
			throw new Error("Credential not found");
		}
		Object.assign(credential, input);
		try {
			await credential.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateTwilioCredential: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const credential = await Credential.findOne({ id });

		if (!credential) {
			throw new Error("Credential not found");
		}
		Object.assign(credential, input);
		try {
			await credential.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateVonageCredential: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const credential = await Credential.findOne({ id });

		if (!credential) {
			throw new Error("Credential not found");
		}
		Object.assign(credential, input);
		try {
			await credential.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateReCaptchaCredential: async (_, { id, input }) => {
		const credential = await Credential.findOne({ id });

		if (!credential) {
			const addCredential = new Credential({ id: 1, reCaptcha: input });
			await addCredential.save();
			return true;
		}
		Object.assign(credential.reCaptcha, input);
		try {
			await credential.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateFirebaseCredential: async (_, { id, input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const credential = await Credential.findOne({ id });

		if (!credential) {
			const addCredential = new Credential({ id: 1, firebase: input });
			await addCredential.save();
			return true;
		}

		var mergeInput = { serviceAccount: credential.firebase.serviceAccount };
		if (input["serviceAccount"] != null) {
			let options = {
				uploadPath: "credentials",
				namePrefix: "credential_",
				addTime: true,
			};
			try {
				const result = await uploadFile(input["serviceAccount"], options);

				mergeInput["serviceAccount"] = {
					src: result.name,
					uploadDriver: result.uploadDriver,
					uploadDir: result.uploadDir,
				};
			} catch (e) {
				mergeInput["serviceAccount"] = credential.firebase.serviceAccount;
			}
		}
		const data = { ...input, ...mergeInput };

		Object.assign(credential.firebase, data);
		try {
			await credential.save();
			return true;
		} catch (e) {
			return false;
		}
	},
};

const credentialResolver = {
	Query: credentialQueryDef,
	Mutation: credentialMutationDef,
};

export default credentialResolver;
