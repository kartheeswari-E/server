import Admin from "../data/models/admin.js";
import Permission from "../data/models/permission.js";
import Role from "../data/models/role.js";

const config = {
	role_structure: {
		admin: {
			admin_users: "c,r,u,d",
			roles: "c,r,u,d",
			users: "c,r,u,d",
			sliders: "c,r,u,d",
			featured_cities: "c,r,u,d",
			pre_footers: "c,r,u,d",
			community_banners: "c,r,u,d",
			login_sliders: "c,r,u,d",
			countries: "c,r,u,d",
			currencies: "c,r,u,d",
			languages: "c,r,u,d",
			coupon_codes: "c,r,u,d",
			static_pages: "c,r,u,d",
			rooms: "c,r,u,d",
			property_types: "c,r,u,d",
			room_types: "c,r,u,d",
			amenity_types: "c,r,u,d",
			amenities: "c,r,u,d",
			bed_types: "c,r,u,d",
			guest_accesses: "c,r,u,d",
			house_rules: "c,r,u,d",
			blogs: "c,r,u,d",
			blog_categories: "c,r,u,d",
			helps: "c,r,u,d",
			help_categories: "c,r,u,d",
			reviews: "r,u",
			api_credentials: "r,u",
			payment_gateways: "r,u",
			email_configurations: "r,u",
			global_settings: "r,u",
			referral_settings: "r,u",
			social_media_links: "r,u",
			metas: "r,u",
			fees: "r,u",
			referrals: "m",
			transactions: "m",
			taxes: "c,r,u,d",
			reports: "m",
			reservations: "m",
			payouts: "m",
			disputes: "m",
			penalties: "m,u",
			email_to_users: "m",
			user_documents: "r,m",
			cookie_policy: "c,r,u,d",
		},
	},
	user_roles: {
		admin: [
			{
				id: 1,
				name: "Admin",
				email: "admin@gmail.com",
				password: "12345678",
				userCurrency: "USD",
				userLanguage: "en",
				status: true,
				primary: true,
			},
		],
	},
	permissions_map: {
		c: "create",
		r: "view",
		u: "update",
		d: "delete",
		m: "manage",
	},
};

function ucwords(str) {
	return str.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async () => {
	try {
		console.log("Running Admin Seeder");

		await Admin.deleteMany({});
		await Role.deleteMany({});
		await Permission.deleteMany({});

		const mapPermission = new Map(Object.entries(config.permissions_map));
		let roleId = 1;
		let permissionId = 1;
		for (const [key, modules] of Object.entries(config.role_structure)) {
			const role = await Role.create({
				id: roleId++,
				name: key,
				description: ucwords(key.replace("_", " ")),
			});

			for (const [item, value] of Object.entries(modules)) {
				for (const perm of value.split(",")) {
					const permissionValue = mapPermission.get(perm);
					let permission = await Permission.findOne({ name: `${permissionValue}-${item}` });
					if (!permission) {
						permission = await Permission.create({
							name: `${permissionValue}-${item}`,
							display_name: `${capitalize(permissionValue)} ${ucwords(item.replace("_", " "))}`,
							description: `${capitalize(permissionValue)} ${ucwords(item.replace("_", " "))}`,
						});
					}
					role.permissions.push(permission.id);
				}
				await role.save();
			}

			if (config.user_roles[key]) {
				const role_users = config.user_roles[key];

				for (let role_user of role_users) {
					role_user["roleId"] = role.id;
					await Admin.create(role_user);
				}
			}
		}
	} catch (error) {
		console.error("Admin Seeding failed:", error);
	}
};
