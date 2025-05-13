import { mergeTypeDefs } from "@graphql-tools/merge";

import baseTypes from "./base.js";

import amenityTypes from "./amenity.js";

import blogTypes from "./blog.js";
import countryTypes from "./country.js";
import couponCodeTypes from "./coupon_code.js";
import credentialTypes from "./credential.js";
import currencyTypes from "./currency.js";
import featuredCityTypes from "./featured_city.js";
import globalSettingTypes from "./global_setting.js";
import guestAccessTypes from "./guest_access.js";
import helpTypes from "./help.js";

import languageTypes from "./language.js";
import loginSliderTypes from "./login_slider.js";
import metaTypes from "./meta.js";
import payoutMethodsTypes from "./payout_methods.js";
import preFooterTypes from "./pre_footer.js";

import reservationTypes from "./reservation.js";
import reviewTypes from "./review.js";
import roleTypes from "./role.js";

import sliderTypes from "./slider.js";
import staticPageTypes from "./static_page.js";
import transactionTypes from "./transaction.js";
import userTypes from "./user.js";

// import wishlistTypes from "./wishlist.js";

import { amenityTypeDef } from "./../resolvers/amenity.js";

import { blogTypeDef } from "./../resolvers/blog.js";
import { contactUsTypeDef } from "./../resolvers/contact_us.js";
import { countryTypeDef } from "./../resolvers/country.js";
import { couponCodeTypeDef } from "./../resolvers/coupon_code.js";
import { credentialTypeDef } from "./../resolvers/credential.js";
import { currencyTypeDef } from "./../resolvers/currency.js";
import { featuredCityTypeDef } from "./../resolvers/featured_city.js";
import { globalSettingTypeDef } from "./../resolvers/global_setting.js";
import { guestAccessTypeDef } from "./../resolvers/guest_access.js";
import { helpTypeDef } from "./../resolvers/help.js";

import { languageTypeDef } from "./../resolvers/language.js";
import { loginSliderTypeDef } from "./../resolvers/login_slider.js";
import { metaTypeDef } from "./../resolvers/meta.js";
import { preFooterTypeDef } from "./../resolvers/pre_footer.js";

import { reservationTypeDef } from "./../resolvers/reservation.js";
import { reviewTypeDef } from "./../resolvers/review.js";
import { roleTypeDef } from "./../resolvers/role.js";

import { sliderTypeDef } from "./../resolvers/slider.js";
import { staticPageTypeDef } from "./../resolvers/static_page.js";
import { transactionTypeDef } from "./../resolvers/transaction.js";
import { userTypeDef } from "./../resolvers/user.js";

// import { wishlistTypeDef } from "./../resolvers/wishlist.js";

import { adminTypeDef } from "../resolvers/admin.js";
import adminTypes from "./admin.js";
import communityBannerTypes from "./community_banner.js";
import { communityBannerTypeDef } from "../resolvers/community_banner.js";
import spaceTypeTypes from "./space_type.js";
import { spaceTypeTypeDef } from "../resolvers/space_type.js";
import serviceTypes from "./service.js";
import { serviceTypeDef } from "../resolvers/service.js";
import spaceStyleTypes from "./space_style.js";
import { spaceStyleTypeDef } from "../resolvers/space_style.js";
import specialFeatureTypes from "./special_feature.js";
import { specialFeatureTypeDef } from "../resolvers/special_feature.js";
import spaceRuleTypes from "./space_rule.js";
import { spaceRuleTypeDef } from "../resolvers/space_rule.js";
import activityTypeTypes from "./activity_type.js";
import { activityTypeTypeDef } from "../resolvers/activity_type.js";
import activityTypes from "./activity.js";
import { activityTypeDef } from "../resolvers/activity.js";
import spaceTypes from "./space.js";
import { spaceTypeDef } from "../resolvers/space.js";
import adminForgotPasswordTypes from "./forgot_password.js";
import { adminForgotTypeDef } from "../resolvers/forgot_password.js";
import userForgotPasswordSchema from "./user_forgot_password.js";
import { userForgotTypeDef } from "../resolvers/user_forgot_password.js";
import { searchSpaceTypeDef } from "../resolvers/search_filter.js";
import conversationTypes from "./conversation.js";
import { conversationTypeDef } from "../resolvers/conversation.js";
import { specialOfferTypes } from "./special_offer.js";
import { specialOfferTypeDef } from "../resolvers/special_offer.js";
import otherTypes from "./others.js";
import { otherTypeDef } from "../resolvers/others.js";
import payoutMethodTypes from "./payout_methods.js";
import { payoutMethodTypeDef } from "../resolvers/payout_methods.js";
import payoutTypes from "./payout.js";
import { payoutTypeDef } from "../resolvers/payout.js";
import contactUsType from "./contact_us.js";
import { emailManagementType } from "./email_management.js";
import { emailManagementTypeDef } from "../resolvers/email_management.js";

const typeDefs = mergeTypeDefs([
	baseTypes,
	adminTypes,
	amenityTypes,

	blogTypes,
	countryTypes,
	couponCodeTypes,
	credentialTypes,
	currencyTypes,
	featuredCityTypes,
	globalSettingTypes,
	guestAccessTypes,
	helpTypes,

	languageTypes,
	loginSliderTypes,
	metaTypes,
	payoutMethodsTypes,
	preFooterTypes,

	reservationTypes,
	reviewTypes,
	roleTypes,

	sliderTypes,
	staticPageTypes,
	transactionTypes,
	userTypes,
	communityBannerTypes,
	spaceTypeTypes,
	serviceTypes,
	spaceStyleTypes,
	specialFeatureTypes,
	spaceRuleTypes,
	activityTypeTypes,
	activityTypes,
	spaceTypes,
	adminForgotPasswordTypes,
	userForgotPasswordSchema,
	conversationTypes,
	specialOfferTypes,
	otherTypes,
	payoutMethodTypeDef,
	payoutTypes,
	contactUsType,
	emailManagementType,
	// wishlistTypes,

	adminTypeDef,
	amenityTypeDef,

	blogTypeDef,
	contactUsTypeDef,
	countryTypeDef,
	couponCodeTypeDef,
	credentialTypeDef,
	currencyTypeDef,
	featuredCityTypeDef,
	globalSettingTypeDef,
	guestAccessTypeDef,
	helpTypeDef,
	languageTypeDef,
	loginSliderTypeDef,
	metaTypeDef,
	preFooterTypeDef,

	reservationTypeDef,
	reviewTypeDef,
	roleTypeDef,

	sliderTypeDef,
	staticPageTypeDef,
	transactionTypeDef,
	userTypeDef,
	communityBannerTypeDef,
	spaceTypeTypeDef,
	serviceTypeDef,
	spaceStyleTypeDef,
	specialFeatureTypeDef,
	spaceRuleTypeDef,
	activityTypeTypeDef,
	activityTypeDef,
	spaceTypeDef,
	adminForgotTypeDef,
	userForgotTypeDef,
	searchSpaceTypeDef,
	conversationTypeDef,
	specialOfferTypeDef,
	otherTypeDef,
	payoutMethodTypes,
	payoutTypeDef,
	contactUsTypeDef,
	emailManagementTypeDef,
	// wishlistTypeDef,
]);

export default typeDefs;
