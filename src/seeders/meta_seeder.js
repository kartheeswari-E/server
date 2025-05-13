import Meta from "../data/models/meta.js";

const data = [
	{ id: 1, routeName: "home", displayName: "/", title: { en: "Holiday Lets, Homes & Places - {SITE_NAME}" } },
	{ id: 2, routeName: "search", displayName: "search", title: { en: "Search" } },
	{ id: 3, routeName: "room_details", displayName: "room_details", title: { en: "{LISTING_NAME} in {CITY_NAME}" } },
	{ id: 4, routeName: "login", displayName: "login", title: { en: "Login / Signup" } },
	{ id: 5, routeName: "signup", displayName: "signup", title: { en: "Signup / Login" } },
	{ id: 6, routeName: "reset_password", displayName: "reset_password", title: { en: "Recover Your Account" } },
	{ id: 7, routeName: "view_profile", displayName: "view_profile", title: { en: "{USER_NAME} 's Profile" } },
	{ id: 8, routeName: "dashboard", displayName: "dashboard", title: { en: "Dashboard" } },
	{ id: 9, routeName: "create_listing", displayName: "create_listing", title: { en: "List Your Space and earn with {SITE_NAME} | Be a host" } },
	{ id: 10, routeName: "listings", displayName: "listings", title: { en: "Your Listings" } },
	{ id: 11, routeName: "listing_home", displayName: "listing_home", title: { en: "Manage Your Listing" } },
	{ id: 12, routeName: "manage_listing", displayName: "manage_listing", title: { en: "Manage Your Listing" } },
	{ id: 13, routeName: "invite", displayName: "invite", title: { en: "Refer and Earn" } },
	{ id: 14, routeName: "invite_referral", displayName: "invite_referral", title: { en: "Refer and Earn" } },
	{ id: 15, routeName: "account_settings", displayName: "account_settings", title: { en: "Account Settings" } },
	{ id: 16, routeName: "update_account_settings", displayName: "account_settings/{PAGE}", title: { en: "{PAGE} - {SITE_NAME}" } },
	{ id: 17, routeName: "payout_methods.add", displayName: "add_payout", title: { en: "Add Payout Method" } },
	{ id: 18, routeName: "payout_methods.edit", displayName: "edit_payout", title: { en: "Edit Payout Method" } },
	{ id: 19, routeName: "reviews", displayName: "user_reviews", title: { en: "User Reviews" } },
	{ id: 20, routeName: "edit_review", displayName: "edit_reviews", title: { en: "Edit a Review" } },
	{ id: 21, routeName: "payment.home", displayName: "payment.home", title: { en: "Complete Your Booking" } },
	{ id: 22, routeName: "inbox", displayName: "inbox", title: { en: "Inbox" } },
	{ id: 23, routeName: "conversation", displayName: "conversation", title: { en: "Conversation" } },
	{ id: 24, routeName: "trips", displayName: "trips", title: { en: "Your Trips" } },
	{ id: 25, routeName: "reservations", displayName: "reservations", title: { en: "Your Reservations" } },
	{ id: 26, routeName: "view_receipt", displayName: "receipt", title: { en: "Receipt" } },
	{ id: 27, routeName: "view_itinerary", displayName: "itinerary", title: { en: "Itinerary" } },
	{ id: 28, routeName: "contact_us", displayName: "contact_us", title: { en: "Contact Us" } },
	{ id: 29, routeName: "cancellation_policies", displayName: "cancellation_policies", title: { en: "Cancellation Policies" } },
	{ id: 30, routeName: "no_internet", displayName: "no_internet", title: { en: "No Internet Connection" } },
	{ id: 31, routeName: "account_disabled", displayName: "account_disabled", title: { en: "Account Disabled" } },
	{ id: 32, routeName: "blog", displayName: "blog", title: { en: "Blogs - {SITE_NAME}" } },
	{ id: 33, routeName: "blog.category", displayName: "blog category", title: { en: "{SLUG} - {SITE_NAME} Blog" } },
	{ id: 34, routeName: "blog.article", displayName: "blog article", title: { en: "{SLUG} - {SITE_NAME} Blog" } },
	{ id: 35, routeName: "help", displayName: "help", title: { en: "{SITE_NAME} - Help Center" } },
	{ id: 36, routeName: "help.category", displayName: "help category", title: { en: "{SLUG} - {SITE_NAME} Help Center" } },
	{ id: 37, routeName: "help.article", displayName: "help article", title: { en: "{SLUG} - {SITE_NAME} Help Center" } },
	{ id: 38, routeName: "wishlists", displayName: "wishlists", title: { en: "Saved - {SITE_NAME}" } },
	{ id: 39, routeName: "wishlist.list", displayName: "wishlist list", title: { en: "{LIST_NAME} · Saved - {SITE_NAME}" } },
	{ id: 40, routeName: "host_coupon_codes", displayName: "host_coupon_codes", title: { en: "Manage Coupon Codes" } },
	{ id: 41, routeName: "host_coupon_codes.create", displayName: "create_host_coupon_codes", title: { en: "Manage Coupon Codes" } },
	{ id: 42, routeName: "host_coupon_codes.edit", displayName: "edit_host_coupon_codes", title: { en: "Manage Coupon Codes" } },
	{ id: 43, routeName: "host_additional_tax", displayName: "host_additional_tax", title: { en: "Manage Additional Tax" } },
	{ id: 44, routeName: "host_additional_tax.create", displayName: "create_host_additional_tax", title: { en: "Manage Additional Tax" } },
	{ id: 45, routeName: "host_additional_tax.edit", displayName: "edit_additional_tax", title: { en: "Manage Additional Tax" } },
	{ id: 46, routeName: "disputes", displayName: "disputes", title: { en: "Disputes" } },
	{ id: 47, routeName: "dispute_conversation", displayName: "dispute_conversation", title: { en: "Dispute Conversation" } },
	{ id: 48, routeName: "user_reviews", displayName: "user_reviews", title: { en: "User Reviews" } },
	{ id: 49, routeName: "edit_experience_review", displayName: "edit_experience_review", title: { en: "Edit a Review" } },
	{ id: 50, routeName: "delete_room", displayName: "delete_room", title: { en: "Deleted Rooms" } },
	{ id: 51, routeName: "delete_experiences", displayName: "delete_experiences", title: { en: "Deleted Experiences" } },
	{ id: 52, routeName: "user_verification", displayName: "user_verification", title: { en: "User Verification" } },
	{ id: 53, routeName: "personal_info", displayName: "personal_info", title: { en: "Personal Info" } },
	{ id: 54, routeName: "global_preference", displayName: "global_preference", title: { en: "Global Preference" } },
	{ id: 55, routeName: "login_and_security", displayName: "login_and_security", title: { en: "Login And Security" } },
	{ id: 56, routeName: "payment_payouts", displayName: "payment_payouts", title: { en: "Payment Payouts" } },
	{ id: 57, routeName: "profile_photos", displayName: "profile_photos", title: { en: "Profile Photo" } },
	{ id: 58, routeName: "transaction_history", displayName: "transaction_history", title: { en: "Transaction History" } },
	{ id: 59, routeName: "duplicate", displayName: "duplicate", title: { en: "List Your Space and earn with HyraSpace" } },
	{ id: 61, routeName: "bookings", displayName: "bookings", title: { en: "Your Bookings" } },
];

export default async () => {
	try {
		console.log("Running Meta Seeder");

		await Meta.deleteMany({});

		data.forEach(async (item) => {
			await Meta.create(item);
		});
	} catch (error) {
		console.error("Meta Seeding failed:", error);
	}
};
