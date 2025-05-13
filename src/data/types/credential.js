import { gql } from "apollo-server-express";

const credentialsType = gql`
	type EmailConfig {
		queueConnection: String
		driver: String
		host: String
		port: String
		fromAddress: String
		fromName: String
		encryption: String
		username: String
		password: String
	}

	type GoogleMap {
		apiKey: String
		serverKey: String
		appApiKey: String
	}

	type MapBox {
		publishKey: String
		secretKey: String
	}

	type Google {
		isEnabled: Boolean
		clientId: String
		secretKey: String
	}

	type Facebook {
		isEnabled: Boolean
		appId: String
		appSecret: String
		appVersion: String
	}

	type Apple {
		isEnabled: Boolean
		serviceId: String
		teamId: String
		keyId: String
		keyFile: String
	}

	type Stripe {
		currencyCode: String
		apiVersion: String
		publishKey: String
		secretKey: String
	}

	type Cloudinary {
		cloudName: String
		apiKey: String
		apiSecret: String
	}

	type Aws {
		region: String
		bucket: String
		accessKey: String
		secretKey: String
	}

	type Twilio {
		accountSid: String
		authToken: String
		fromNumber: String
	}

	type Vonage {
		apiKey: String
		apiSecret: String
		brandName: String
	}

	type ReCaptcha {
		isEnabled: Boolean
		version: Int
		siteKey: String
		secretKey: String
	}

	type Firebase {
		isEnabled: Boolean
		apiKey: String
		authDomain: String
		databaseUrl: String
		projectId: String
		storageBucket: String
		messagingSenderId: String
		appId: String
		serviceAccount: String
	}

	type Credential {
		emailConfig: EmailConfig
		googleMap: GoogleMap
		mapBox: MapBox
		google: Google
		facebook: Facebook
		apple: Apple
		stripe: Stripe
		cloudinary: Cloudinary
		aws: Aws
		twilio: Twilio
		vonage: Vonage
		reCaptcha: ReCaptcha
		firebase: Firebase
	}

	input EmailConfigInput {
		queueConnection: String
		driver: String
		host: String
		port: String
		fromAddress: String
		fromName: String
		encryption: String
		username: String
		password: String
	}

	input GoogleMapInput {
		apiKey: String
		serverKey: String
		appApiKey: String
	}

	input MapBoxInput {
		publishKey: String
		secretKey: String
	}

	input GoogleInput {
		isEnabled: Boolean
		clientId: String
		secretKey: String
	}

	input FacebookInput {
		isEnabled: Boolean
		appId: String
		appSecret: String
		appVersion: String
	}

	input AppleInput {
		isEnabled: Boolean
		serviceId: String
		teamId: String
		keyId: String
		keyFile: Upload
	}

	input StripeInput {
		currencyCode: String
		apiVersion: String
		publishKey: String
		secretKey: String
	}

	input CloudinaryInput {
		cloudName: String
		apiKey: String
		apiSecret: String
	}

	input AwsInput {
		region: String
		bucket: String
		accessKey: String
		secretKey: String
	}

	input TwilioInput {
		accountSid: String
		authToken: String
		fromNumber: String
	}

	input VonageInput {
		apiKey: String
		apiSecret: String
		brandName: String
	}

	input ReCaptchaInput {
		isEnabled: Boolean
		version: Int
		siteKey: String
		secretKey: String
	}

	input FirebaseInput {
		isEnabled: Boolean
		apiKey: String
		authDomain: String
		databaseUrl: String
		projectId: String
		storageBucket: String
		messagingSenderId: String
		appId: String
		serviceAccount: Upload
	}
	input CredentialInput {
		emailConfig: EmailConfigInput
		googleMap: GoogleMapInput
		mapBox: MapBoxInput
		google: GoogleInput
		facebook: FacebookInput
		apple: AppleInput
		stripe: StripeInput
		cloudinary: CloudinaryInput
		aws: AwsInput
		twilio: TwilioInput
		vonage: VonageInput
		reCaptcha: ReCaptchaInput
		firebase: FirebaseInput
	}
`;

export default credentialsType;
