import { Schema, model } from "mongoose";

const credentialSchema = new Schema({
	id: {
		unique: true,
		type: Number,
	},
	emailConfig: {
		queueConnection: String,
		driver: String,
		host: String,
		port: String,
		fromAddress: String,
		fromName: String,
		encryption: String,
		username: String,
		password: String,
	},
	googleMap: {
		apiKey: String,
		serverKey: String,
		appApiKey: String,
	},
	mapBox: {
		publishKey: String,
		secretKey: String,
	},
	google: {
		isEnabled: Boolean,
		clientId: String,
		secretKey: String,
	},
	facebook: {
		isEnabled: Boolean,
		appId: String,
		appSecret: String,
		appVersion: String,
	},
	apple: {
		isEnabled: Boolean,
		serviceId: String,
		teamId: String,
		keyId: String,
		keyFile: String,
	},
	stripe: {
		currencyCode: String,
		apiVersion: String,
		publishKey: String,
		secretKey: String,
	},
	cloudinary: {
		cloudName: String,
		apiKey: String,
		apiSecret: String,
	},
	aws: {
		region: String,
		bucket: String,
		accessKey: String,
		secretKey: String,
	},
	twilio: {
		accountSid: String,
		authToken: String,
		fromNumber: String,
	},
	vonage: {
		apiKey: String,
		apiSecret: String,
		brandName: String,
	},
	reCaptcha: {
		isEnabled: Boolean,
		version: Number,
		siteKey: String,
		secretKey: String,
	},
	firebase: {
		isEnabled: Boolean,
		apiKey: String,
		authDomain: String,
		databaseUrl: String,
		projectId: String,
		storageBucket: String,
		messagingSenderId: String,
		appId: String,
		serviceAccount: String,
	},
});

const Credential = model("Credential", credentialSchema, "credentials");

export default Credential;
