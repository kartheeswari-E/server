import mongoose from "mongoose";
import connectDB from "../db.js";
import globalSettingSeeder from "./global_setting_seeder.js";
import credentialSeeder from "./credential_seeder.js";
import metaSeeder from "./meta_seeder.js";
import countrySeeder from "./country_seeder.js";
import currencySeeder from "./currency_seeder.js";
import languageSeeder from "./language_seeder.js";
import timezoneSeeder from "./timezone_seeder.js";
import adminSeeder from "./admin_seeder.js";
import sliderSeeder from "./slider_seeder.js";
import preFooterSeeder from "./pre_footer_seeder.js";
import communityBannerSeeder from "./community_banner_seeder.js";
import featuredCitySeeder from "./featured_city_seeder.js";
import userSeeder from "./user_seeder.js";
import spaceSeeder from "./space_seeder.js";
import spaceTypeSeeder from "./space_type_seeder.js";
import guestAccessSeeder from "./guest_access_seeder.js";
import amenitiesSeeder from "./amenities_seeder.js";
import servicesSeeder from "./services_seeder.js";
import spaceStylesSeeder from "./space_styles_seeder.js";
import spaceRulesSeeder from "./space_rules_seeder.js";
import activityTypeSeeder from "./activity_type_seeder.js";
import activitySeeder from "./activity_seeder.js";
import blogSeeder from "./blog_seeder.js";
import spaceAvailabilitySeeder from "./space_availability_seeder.js";
import specialOfferSeeder from "./special_offer_seeder.js";
import transactionSeeder from "./transaction_seeder.js";
import conversationSeeder from "./conversation_seeder.js";
import emailManagementSeeder from "./email_management.js";

connectDB().then(async (conn) => {
	const db = conn.connection.db;
	const collections = await db.listCollections().toArray();
	collections
		.map((collection) => collection.name)
		.forEach(async (collectionName) => {
			console.log("dropping collection " + collectionName);
			db.dropCollection(collectionName);
		});

	await globalSettingSeeder();
	await credentialSeeder();
	await metaSeeder();
	await countrySeeder();
	await currencySeeder();
	await languageSeeder();
	await timezoneSeeder();
	await adminSeeder();
	await sliderSeeder();
	await preFooterSeeder();

	await communityBannerSeeder();
	await featuredCitySeeder();

	await userSeeder();
	await spaceSeeder();
	await spaceTypeSeeder();
	await guestAccessSeeder();
	await amenitiesSeeder();
	await servicesSeeder();
	await spaceStylesSeeder();
	await spaceRulesSeeder();
	await activityTypeSeeder();
	await activitySeeder();
	await blogSeeder();
	await spaceAvailabilitySeeder();
	await specialOfferSeeder();
	await transactionSeeder();
	await conversationSeeder();
	await emailManagementSeeder();

	process.exit(1);
});
