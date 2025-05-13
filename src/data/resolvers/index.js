import { mergeResolvers } from "@graphql-tools/merge";

import baseResolvers from "./base.js";

import amenityResolver from "./amenity.js";

import blogResolver from "./blog.js";
import contactUsResolver from "./contact_us.js";
import countryResolver from "./country.js";
import couponCodeResolver from "./coupon_code.js";
import credentialResolver from "./credential.js";
import currencyResolver from "./currency.js";
import featuredCityResolver from "./featured_city.js";
import globalSettingResolver from "./global_setting.js";
import guestAccessResolver from "./guest_access.js";
import helpResolver from "./help.js";

import languageResolver from "./language.js";
import loginSliderResolver from "./login_slider.js";
import metaResolver from "./meta.js";
// import payoutMethodsResolver from "./payout_methods.js";
import preFooterResolver from "./pre_footer.js";

import reservationResolver from "./reservation.js";
import reviewResolver from "./review.js";
import roleResolver from "./role.js";

import sliderResolver from "./slider.js";
import staticPageResolver from "./static_page.js";
import transactionResolver from "./transaction.js";
import userResolver from "./user.js";
// import vendorResolver from "./vendor.js";
// import wishlistResolver from "./wishlist.js";
import adminResolver from "./admin.js";
import communityBannerResolver from "./community_banner.js";
import spaceTypeResolver from "./space_type.js";
import serviceResolver from "./service.js";
import spaceStyleResolver from "./space_style.js";
import specialFeatureResolver from "./special_feature.js";
import spaceRuleResolver from "./space_rule.js";
import activityTypeResolver from "./activity_type.js";
import activityResolver from "./activity.js";
import spaceResolver from "./space.js";
import adminForgotPasswordResolver from "./forgot_password.js";
import userForgotPasswordResolver from "./user_forgot_password.js";
import searchFilterResolver from "./search_filter.js";
import conversationResolver from "./conversation.js";
import specialOfferResolver from "./special_offer.js";
import otherResolver from "./others.js";
import payoutMethodResolver from "./payout_methods.js";
import payoutResolver from "./payout.js";
import emailManagementResolver from "./email_management.js";

const resolvers = mergeResolvers([
	baseResolvers,
	adminResolver,
	amenityResolver,

	blogResolver,
	contactUsResolver,
	countryResolver,
	couponCodeResolver,
	credentialResolver,
	currencyResolver,
	featuredCityResolver,
	globalSettingResolver,
	guestAccessResolver,
	helpResolver,
	languageResolver,
	loginSliderResolver,
	metaResolver,
	// payoutMethodsResolver,
	preFooterResolver,

	reservationResolver,
	reviewResolver,
	roleResolver,

	sliderResolver,
	staticPageResolver,
	transactionResolver,
	userResolver,
	communityBannerResolver,
	spaceTypeResolver,
	serviceResolver,
	spaceStyleResolver,
	specialFeatureResolver,
	spaceRuleResolver,
	activityTypeResolver,
	activityResolver,
	spaceResolver,
	adminForgotPasswordResolver,
	userForgotPasswordResolver,
	searchFilterResolver,
	conversationResolver,
	specialOfferResolver,
	otherResolver,
	payoutMethodResolver,
	payoutResolver,
	emailManagementResolver,
	// wishlistResolver,
]);

export default resolvers;
