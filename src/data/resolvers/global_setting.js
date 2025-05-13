import { gql } from "apollo-server-express";
import GlobalSetting from "../models/global_setting.js";
import uploadFile from "../../utils/file_uploader.js";

export const globalSettingTypeDef = gql`
	type Query {
		getGlobalSettings: GlobalSetting
	}
	type Mutation {
		updateGlobalSetting(input: GlobalSettingInput): Boolean
		createOrUpdateFee(input: FeeInput): Boolean
		updateSocialMediaLinks(input: SocialMediaLinksInput): Boolean
	}
`;

const globalSettingQueryDef = {
	getGlobalSettings: async (_, context) => {
		const globalSettings = await GlobalSetting.findOne({});
		return globalSettings;
	},
};

const globalSettingMutationDef = {
	updateGlobalSetting: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const globalSetting = await GlobalSetting.findOne({});

		if (!globalSetting) {
			throw new Error("GlobalSetting not found");
		}

		const [logo, secondaryLogo, favicon] = await Promise.all([input.logo, input.secondaryLogo, input.favicon]);

		if (!globalSetting) {
			throw new Error("GlobalSetting not found");
		}

		const mergeInput = {
			logo: globalSetting.logo,
			secondaryLogo: globalSetting.secondaryLogo,
			favicon: globalSetting.favicon,
		};

		const handleUpload = async (file, field, i) => {
			if (file != null) {
				const options = {
					uploadPath: "logos",
					namePrefix: "logo_" + `${i}`,
					addTime: true,
				};
				try {
					const result = await uploadFile(file, options);
					return {
						src: result.name,
						uploadDriver: result.uploadDriver,
						uploadDir: result.uploadDir,
					};
				} catch (e) {
					return globalSetting[field];
				}
			}
			return globalSetting[field];
		};

		mergeInput.logo = await handleUpload(logo, "logo", 1);
		mergeInput.secondaryLogo = await handleUpload(secondaryLogo, "secondaryLogo", 2);
		mergeInput.favicon = await handleUpload(favicon, "favicon", 3);

		const data = { ...input, ...mergeInput };
		Object.assign(globalSetting, data);

		try {
			await globalSetting.save();
			return true;
		} catch (e) {
			return false;
		}
	},
	updateSocialMediaLinks: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const globalSetting = await GlobalSetting.findOne({});

		if (!globalSetting) {
			throw new Error("GlobalSetting not found");
		}

		if (input) {
			Object.assign(globalSetting.socialMediaLinks, input);
		}
		try {
			await globalSetting.save();

			return true;
		} catch (e) {
			return false;
		}
	},
	createOrUpdateFee: async (_, { input }, context) => {
		if (!context.user && context.user.type !== "admin") {
			throw new Error("Authorization failed");
		}
		const globalSetting = await GlobalSetting.findOne({});

		if (!globalSetting) {
			throw new Error("GlobalSetting not found");
		}

		if (input) {
			Object.assign(globalSetting.fee, input);
		}
		try {
			await globalSetting.save();

			return true;
		} catch (e) {
			return false;
		}
	},
};

const globalSettingResolver = {
	Query: globalSettingQueryDef,
	Mutation: globalSettingMutationDef,
};

export default globalSettingResolver;
