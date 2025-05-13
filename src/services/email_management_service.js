import moment from "moment";
import Admin from "../data/models/admin.js";
import Reservation from "../data/models/reservation.js";
import emailManagementResolver from "../data/resolvers/email_management.js";
import { getEarliestDate, getEarliestReserve, getEndDate, getLastReserve } from "../utils/payout_services.js";

let host = process.env.APP_URL;

function priceTemplate(type, reservation) {
	if (type == "user") {
		return `  <table>
            <tr>
                <td>$${reservation.hourlyPrice} x ${reservation.totalHours} Hours</td>
                <td>$${reservation.subTotal}</td>
            </tr>
            ${
				reservation.appliedDiscount > 0
					? `<tr>
						<td>${reservation.discountType}</td>
						<td>$${reservation.appliedDiscount}</td>
					</tr>`
					: ""
			}
            ${
				reservation.cleaningFee > 0
					? `<tr>
						<td>Cleaning Fee</td>
						<td>$${reservation.cleaningFee}</td>
					</tr>`
					: ""
			}
            <tr>
                <td>Sub Total</td>
                <td>$${reservation.subTotal + (reservation.cleaningFee ? reservation.cleaningFee : 0) - (reservation.specialOfferId ? 0 : reservation.appliedDiscount)}</td>
            </tr>
            <tr>
                <td>Service Fee</td>
                <td>$${reservation?.serviceFee}</td>
            </tr>
            <tr class="total">
                <td>Total</td>
                <td>$${reservation.total}</td>
            </tr>
            ${
				reservation.securityFee > 0
					? `<tr>
						<td>Security Fee</td>
						<td>$${reservation.securityFee}</td>
					</tr>`
					: ""
			}
        </table>`;
	} else if (type == "host") {
		return `  <table>
            <tr>
                <td>$${reservation.hourlyPrice} x ${reservation.totalHours} Hours</td>
                <td>$${reservation.subTotal}</td>
            </tr>
            ${
				reservation.appliedDiscount > 0
					? `<tr>
						<td>${reservation.discountType}</td>
						<td>$${reservation.appliedDiscount}</td>
					</tr>`
					: ""
			}
            ${
				reservation.cleaningFee > 0
					? `<tr>
						<td>Cleaning Fee</td>
						<td>$${reservation.cleaningFee}</td>
					</tr>`
					: ""
			}
            <tr>
                <td>Sub Total</td>
                <td>$${reservation.subTotal + (reservation.cleaningFee ? reservation.cleaningFee : 0) - (reservation.specialOfferId ? 0 : reservation.appliedDiscount)}</td>
            </tr>
            <tr>
                <td>Service Fee</td>
                <td>$${reservation?.serviceFee}</td>
            </tr>
            <tr class="total">
                <td>Total</td>
                <td>$${reservation.total}</td>
            </tr>
            <tr class="total">
                <td>Host Fee</td>
                <td>-$${reservation.vendorFee}</td>
            </tr>
            <tr class="total">
                <td>Total Payout</td>
                <td>$${reservation?.payout?.amount}</td>
            </tr>
            ${
				reservation.securityFee > 0
					? `<tr>
						<td>Security Fee</td>
						<td>$${reservation.securityFee}</td>
					</tr>`
					: ""
			}
        </table>`;
	}
}

export function profileTemplate(user) {
	const user_avatar_url = host + "/images/" + (user.image.uploadDir ? user.image.uploadDir : "") + user.image.src;
	const user_name = user?.firstName;
	const user_since = moment(user?.createdAt).format("YYYY");

	return `<div style="text-align: center; padding: 16px 0;">
            <img src="${user_avatar_url ? user_avatar_url : "/images/profile_picture.png>"}" alt="${user_name}" class="avatar">
            <h1 class="h1">${user_name}</h1>
            <p>Hyra Space Member Since ${user_since}</p>
        </div>`;
}

export async function bookingConfirmed(reservationId) {
	try {
		const reservation = await Reservation.findOne({ id: reservationId })
			.populate("userDetails")
			.populate("hostDetails")
			.populate("spaceDetails")
			.populate("activityDetails")
			.populate("spaceTypeDetails");

		const space = reservation.spaceDetails;
		const spaceType = reservation.spaceTypeDetatils;
		const user = reservation.userDetails;
		const spaceHost = reservation?.hostDetails;
		const { guestCount, payout, code, reserveData } = reservation;
		const admins = await Admin.find();
		const adminEmails = admins.map((admin) => admin.email); // Extract email addresses

		const emailContent = {
			templateId: 10,
			data: {
				main_image_url:
					host +
					"/images/" +
					(space.spacePhotos?.[0]?.image.uploadDir ? space.spacePhotos?.[0]?.image.uploadDir : "") +
					space.spacePhotos?.[0]?.image.src,
				main_image_alt: space.name.get("en"),
				listing_title: space.name.get("en"),
				listing_type: spaceType?.name?.get("en"),
				address: space.spaceAddress.addressLine1,
				directions_url: "",
				checkin_date: moment(getEarliestDate(reserveData)).format("DD/MM/YYYY"),
				checkout_date: moment(getEndDate(reserveData)).format("DD/MM/YYYY"),
				checkin_flexibility: moment(getEarliestReserve(reserveData).startTime, "HH:mm:ss").format("hh:mm A"),
				checkout_flexibility: moment(getLastReserve(reserveData).endTime, "HH:mm:ss").format("hh:mm A"),
				guests: guestCount,
				confirmation_code: code,
				view_receipt_url: "",
				download_receipt_url: "",
				help_center_url: "",
				contact_us_url: "",
			},
			subject: "Reservation Confirmed",
			recipient: user.email,
		};

		const sendUser = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
			...emailContent,
			recipient: user?.email,
			data: {
				...emailContent.data,
				subject_header: "Your Booking is Confirmed",
				sub_subject: `You're going to ${space?.spaceAddress?.city}`,
				user_profile: "",
				host_profile: profileTemplate(spaceHost),
				price_details: priceTemplate("user", reservation),
			},
		});

		const sendHost = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
			...emailContent,
			recipient: spaceHost?.email,
			data: {
				...emailContent.data,
				subject_header: `New Booking for ${space.name.get("en")}`,
				sub_subject: `You will earn $${parseFloat(payout?.amount).toFixed(2)}`,
				user_profile: profileTemplate(user),
				host_profile: "",
				price_details: priceTemplate("host", reservation),
			},
		});

		const sendAdmin = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
			...emailContent,
			recipient: adminEmails,
			data: {
				...emailContent.data,
				subject_header: `New Booking for ${space.name.get("en")}`,
				sub_subject: `Booked by ${user?.firstName}`,
				user_profile: profileTemplate(user),
				host_profile: profileTemplate(spaceHost),
				price_details: priceTemplate("host", reservation),
			},
		});
	} catch (e) {
		console.log("booking", e);
	}
}

export async function bookingCancelled(reservationId, cancelledBy) {
	try {
		const reservation = await Reservation.findOne({ id: reservationId })
			.populate("userDetails")
			.populate("hostDetails")
			.populate("spaceDetails")
			.populate("activityDetails")
			.populate("spaceTypeDetails");
		const space = reservation.spaceDetails;
		const spaceType = reservation.spaceTypeDetails;
		const user = reservation.userDetails;
		const spaceHost = reservation?.hostDetails;
		const { guestCount, payout, code, reserveData } = reservation;
		const admins = await Admin.find();
		const adminEmails = admins.map((admin) => admin.email); // Extract email addresses

		const emailContent = {
			templateId: 12,
			data: {
				main_image_url:
					host +
					"/images/" +
					(space.spacePhotos?.[0]?.image.uploadDir ? space.spacePhotos?.[0]?.image.uploadDir : "") +
					space.spacePhotos?.[0]?.image.src,
				main_image_alt: space?.name.get("en"),
				listing_title: space?.name.get("en"),
				listing_type: spaceType?.name.get("en"),
				directions_url: "",
				checkin_date: moment(getEarliestDate(reserveData)).format("DD/MM/YYYY"),
				checkout_date: moment(getEndDate(reserveData)).format("DD/MM/YYYY"),
				checkin_flexibility: moment(getEarliestReserve(reserveData).startTime, "HH:mm:ss").format("hh:mm A"),
				checkout_flexibility: moment(getLastReserve(reserveData).endTime, "HH:mm:ss").format("hh:mm A"),
				guests: guestCount,
				space_type: spaceType?.name?.get("en"),
				view_receipt_url: "",
				download_receipt_url: "",
				help_center_url: "",
				contact_us_url: "",
			},
		};

		if (cancelledBy == "user") {
			const sendHost = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
				...emailContent,
				recipient: spaceHost?.email,
				data: {
					...emailContent.data,
					subject_header: `Booking Cancelled By ${user?.firstName}`,
					sub_subject: `in ${space?.name?.get("en")}`,
					user_profile: profileTemplate(user),
					host_profile: "",
				},
				subject: `Reservation ${reservation.id} for your listing ${space?.name?.get("en")} has been cancelled by ${user?.firstName}`,
			});

			const sendAdmin = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
				...emailContent,
				recipient: adminEmails,
				data: {
					...emailContent.data,
					subject_header: `Booking Cancelled By ${user?.firstName}`,
					sub_subject: `in ${space?.name?.get("en")}`,
					user_profile: profileTemplate(user),
					host_profile: profileTemplate(spaceHost),
				},
				subject: `Reservation ${reservation.id} for your listing ${space?.name?.get("en")} has been cancelled by ${user?.firstName}`,
			});
		} else if (cancelledBy == "vendor") {
			const sendUser = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
				...emailContent,
				recipient: user?.email,
				data: {
					...emailContent.data,
					subject_header: `Booking Cancelled By ${spaceHost?.firstName}`,
					sub_subject: `in ${space?.name?.get("en")}`,
					user_profile: "",
					host_profile: profileTemplate(spaceHost),
				},
				subject: `Your Reservation for ${space?.name?.get("en")} has been cancelled by the host`,
			});
			const sendAdmin = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
				...emailContent,
				recipient: adminEmails,
				data: {
					...emailContent.data,
					subject_header: `Booking Cancelled By ${spaceHost?.firstName}`,
					sub_subject: `in ${space?.name?.get("en")}`,
					user_profile: profileTemplate(user),
					host_profile: profileTemplate(spaceHost),
				},
				subject: `Your Reservation for ${space?.name?.get("en")} has been cancelled by the host`,
			});
		}
	} catch (e) {
		console.log("booking", e);
	}
}
export async function requestToBook(reservationId) {
	try {
		const reservation = await Reservation.findOne({ id: reservationId })
			.populate("userDetails")
			.populate("hostDetails")
			.populate("spaceDetails")
			.populate("activityDetails")
			.populate("spaceTypeDetails");
		if (reservation.status !== "pending") return;

		const space = reservation.spaceDetails;
		const spaceType = reservation.spaceTypeDetails;
		const user = reservation.userDetails;
		const spaceHost = reservation?.hostDetails;
		const { guestCount, payout, code, reserveData } = reservation;
		const admins = await Admin.find();
		const adminEmails = admins.map((admin) => admin.email); // Extract email addresses

		const emailContent = {
			templateId: 13,
			data: {
				main_image_url:
					host +
					"/images/" +
					(space.spacePhotos?.[0]?.image.uploadDir ? space.spacePhotos?.[0]?.image.uploadDir : "") +
					space.spacePhotos?.[0]?.image.src,
				main_image_alt: space?.name?.get("en"),
				listing_title: space?.name?.get("en"),
				listing_type: spaceType?.name?.get("en"),
				directions_url: "",
				checkin_date: moment(getEarliestDate(reserveData)).format("DD/MM/YYYY"),
				checkout_date: moment(getEndDate(reserveData)).format("DD/MM/YYYY"),
				checkin_flexibility: moment(getEarliestReserve(reserveData).startTime, "HH:mm:ss").format("hh:mm A"),
				checkout_flexibility: moment(getLastReserve(reserveData).endTime, "HH:mm:ss").format("hh:mm A"),
				guests: guestCount,
				view_receipt_url: "",
				download_receipt_url: "",
				help_center_url: "",
				contact_us_url: "",
			},
		};

		const sendUser = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
			...emailContent,
			recipient: user?.email,
			data: {
				...emailContent.data,
				subject_header: `Your Request is Sent To Host`,
				sub_subject: `Please wait until your host responds`,
				user_profile: "",
				host_profile: profileTemplate(spaceHost),
				message_button_txt: "Message to Host",
				message_url: "#",
				price_details: priceTemplate("user", reservation),
			},
			subject: `Your Request is Sent To Host`,
		});

		const sendHost = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
			...emailContent,
			recipient: spaceHost?.email,
			data: {
				...emailContent.data,
				subject_header: `New Request from ${user?.firstName} to book your listing ${space?.name?.get("en")}`,
				sub_subject: `Respond quickly to maintain your response rate`,
				user_profile: profileTemplate(user),
				host_profile: "",
				message_button_txt: "Message to Guest",
				message_url: "#",
				price_details: priceTemplate("host", reservation),
			},
			subject: `New Request from ${user?.firstName}`,
		});

		const sendAdmin = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
			...emailContent,
			recipient: adminEmails,
			data: {
				...emailContent.data,
				subject_header: `New Request from ${user?.firstName} to book your listing ${space?.name?.get("en")}`,
				sub_subject: `Respond quickly to maintain your response rate`,
				user_profile: profileTemplate(user),
				host_profile: profileTemplate(spaceHost),
				price_details: priceTemplate("host", reservation),
			},
			subject: `New Request from ${user?.firstName}`,
		});
	} catch (e) {
		console.log("booking", e);
	}
}
export async function requestExpired(reservationId) {
	try {
		const reservation = await Reservation.findOne({ id: reservationId })
			.populate("userDetails")
			.populate("hostDetails")
			.populate("spaceDetails")
			.populate("activityDetails")
			.populate("spaceTypeDetails");

		const space = reservation.spaceDetails;
		const spaceType = reservation.spaceTypeDetails;
		const user = reservation.userDetails;
		const spaceHost = reservation?.hostDetails;
		const { guestCount, reserveData } = reservation;
		const admins = await Admin.find();
		const adminEmails = admins.map((admin) => admin.email); // Extract email addresses

		const emailContent = {
			templateId: 15,
			data: {
				main_image_url:
					host +
					"/images/" +
					(space.spacePhotos?.[0]?.image.uploadDir ? space.spacePhotos?.[0]?.image.uploadDir : "") +
					space.spacePhotos?.[0]?.image.src,
				main_image_alt: space?.name?.get("en"),
				listing_title: space?.name?.get("en"),
				listing_type: spaceType?.name?.get("en"),
				directions_url: "",
				checkin_date: moment(getEarliestDate(reserveData)).format("DD/MM/YYYY"),
				checkout_date: moment(getEndDate(reserveData)).format("DD/MM/YYYY"),
				checkin_flexibility: moment(getEarliestReserve(reserveData).startTime, "HH:mm:ss").format("hh:mm A"),
				checkout_flexibility: moment(getLastReserve(reserveData).endTime, "HH:mm:ss").format("hh:mm A"),
				guests: guestCount,
				view_receipt_url: "",
				download_receipt_url: "",
				help_center_url: "",
				contact_us_url: "",
			},
		};

		const sendUser = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
			...emailContent,
			recipient: user?.email,
			data: {
				...emailContent.data,
				subject_header: `Your Host not respond to your request.`,
				sub_subject: ``,
				user_profile: "",
				host_profile: profileTemplate(spaceHost),
				keep_searching: "Keep Searching",
			},
			subject: `Your Host not respond to your request.`,
		});

		const sendHost = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
			...emailContent,
			recipient: spaceHost?.email,
			data: {
				...emailContent.data,
				subject_header: `${user?.firstName} Request Expired`,
				sub_subject: "",
				user_profile: profileTemplate(user),
				host_profile: "",
				price_details: priceTemplate("host", reservation),
			},
			subject: `${user?.firstName} Request Expired`,
		});

		const sendAdmin = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
			...emailContent,
			recipient: adminEmails,
			data: {
				...emailContent.data,
				subject_header: `${user?.firstName} Request Expired`,
				sub_subject: ``,
				user_profile: profileTemplate(user),
				host_profile: profileTemplate(spaceHost),
				price_details: priceTemplate("host", reservation),
			},
			subject: `${user?.firstName} Request Expired`,
		});
	} catch (e) {
		console.log("booking", e);
	}
}

export async function requestPreAccepted(reservationId) {
	try {
		const reservation = await Reservation.findOne({ id: reservationId })
			.populate("userDetails")
			.populate("hostDetails")
			.populate("spaceDetails")
			.populate("activityDetails")
			.populate("spaceTypeDetails");
		if (reservation.status !== "pending") return;

		const space = reservation.spaceDetails;
		const spaceType = reservation.spaceTypeDetails;
		const user = reservation.userDetails;
		const spaceHost = reservation?.hostDetails;
		const { guestCount, reserveData } = reservation;
		const admins = await Admin.find();
		const adminEmails = admins.map((admin) => admin.email); // Extract email addresses

		const emailContent = {
			templateId: 16,
			data: {
				main_image_url:
					host +
					"/images/" +
					(space.spacePhotos?.[0]?.image.uploadDir ? space.spacePhotos?.[0]?.image.uploadDir : "") +
					space.spacePhotos?.[0]?.image.src,
				main_image_alt: space?.name?.get("en"),
				listing_title: space?.name?.get("en"),
				listing_type: spaceType?.name?.get("en"),
				directions_url: "",
				checkin_date: moment(getEarliestDate(reserveData)).format("DD/MM/YYYY"),
				checkout_date: moment(getEndDate(reserveData)).format("DD/MM/YYYY"),
				checkin_flexibility: moment(getEarliestReserve(reserveData).startTime, "HH:mm:ss").format("hh:mm A"),
				checkout_flexibility: moment(getLastReserve(reserveData).endTime, "HH:mm:ss").format("hh:mm A"),
				guests: guestCount,
				view_receipt_url: "",
				download_receipt_url: "",
				help_center_url: "",
				contact_us_url: "",
			},
		};

		const sendUser = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
			...emailContent,
			recipient: user?.email,
			data: {
				...emailContent.data,
				subject_header: `Your Request Pre Accepted by ${spaceHost.firstName}`,
				sub_subject: `Complete Payment to Confirm Your Booking`,
				user_profile: "",
				host_profile: profileTemplate(spaceHost),
				message_url: "#",
				price_details: priceTemplate("user", reservation),
			},
			subject: `Your Request Pre Accepted by ${spaceHost.firstName}`,
		});

		const sendAdmin = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
			...emailContent,
			recipient: adminEmails,
			data: {
				...emailContent.data,
				subject_header: `${spaceHost.firstName} Pre Accepted ${user.firstName}'s Request`,
				sub_subject: ``,
				user_profile: profileTemplate(user),
				host_profile: profileTemplate(spaceHost),
				price_details: priceTemplate("host", reservation),
			},
			subject: `${spaceHost.firstName} Pre Accepted ${user.firstName}'s Request`,
		});
	} catch (e) {
		console.log("booking", e);
	}
}

export async function requestDeclined(reservationId) {
	try {
		const reservation = await Reservation.findOne({ id: reservationId })
			.populate("userDetails")
			.populate("hostDetails")
			.populate("spaceDetails")
			.populate("activityDetails")
			.populate("spaceTypeDetails");

		const space = reservation.spaceDetails;
		const spaceType = reservation.spaceTypeDetails;
		const user = reservation.userDetails;
		const spaceHost = reservation?.hostDetails;
		const { guestCount, reserveData } = reservation;
		const admins = await Admin.find();
		const adminEmails = admins.map((admin) => admin.email); // Extract email addresses

		const emailContent = {
			templateId: 17,
			data: {
				main_image_url:
					host +
					"/images/" +
					(space.spacePhotos?.[0]?.image.uploadDir ? space.spacePhotos?.[0]?.image.uploadDir : "") +
					space.spacePhotos?.[0]?.image.src,
				main_image_alt: space?.name?.get("en"),
				listing_title: space?.name?.get("en"),
				listing_type: spaceType?.name?.get("en"),
				directions_url: "",
				checkin_date: moment(getEarliestDate(reserveData)).format("DD/MM/YYYY"),
				checkout_date: moment(getEndDate(reserveData)).format("DD/MM/YYYY"),
				checkin_flexibility: moment(getEarliestReserve(reserveData).startTime, "HH:mm:ss").format("hh:mm A"),
				checkout_flexibility: moment(getLastReserve(reserveData).endTime, "HH:mm:ss").format("hh:mm A"),
				guests: guestCount,
				view_receipt_url: "",
				download_receipt_url: "",
				help_center_url: "",
				contact_us_url: "",
			},
		};

		const sendUser = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
			...emailContent,
			recipient: user?.email,
			data: {
				...emailContent.data,
				subject_header: `Your Request Declined  by ${spaceHost.firstName}`,
				sub_subject: `${spaceHost.firstName} : Declined the request`,
				user_profile: "",
				host_profile: profileTemplate(spaceHost),
				keep_searching: "Keep Searching",
			},
			subject: `Your Request Declined  by ${spaceHost.firstName}`,
		});

		const sendAdmin = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
			...emailContent,
			recipient: adminEmails,
			data: {
				...emailContent.data,
				subject_header: `${user?.firstName} Request Declined by ${spaceHost.firstName}`,
				sub_subject: `${spaceHost.firstName} : Declined the request`,
				user_profile: profileTemplate(user),
				host_profile: profileTemplate(spaceHost),
			},
			subject: `${user?.firstName} Request Declined by ${spaceHost.firstName}`,
		});
	} catch (e) {
		console.log("booking", e);
	}
}

export async function specialOfferSent(reservationId) {
	try {
		const reservation = await Reservation.findOne({ id: reservationId })
			.populate("userDetails")
			.populate("hostDetails")
			.populate("spaceDetails")
			.populate("activityDetails")
			.populate("spaceTypeDetails");

		const space = reservation.spaceDetails;
		const spaceType = reservation.spaceTypeDetails;
		const user = reservation.userDetails;
		const spaceHost = reservation?.hostDetails;
		const { guestCount, reserveData } = reservation;

		const emailContent = {
			templateId: 20,
			data: {
				main_image_url:
					host +
					"/images/" +
					(space.spacePhotos?.[0]?.image.uploadDir ? space.spacePhotos?.[0]?.image.uploadDir : "") +
					space.spacePhotos?.[0]?.image.src,
				main_image_alt: space?.name?.get("en"),
				listing_title: space?.name?.get("en"),
				listing_type: spaceType?.name?.get("en"),
				directions_url: "",
				checkin_date: moment(getEarliestDate(reserveData)).format("DD/MM/YYYY"),
				checkout_date: moment(getEndDate(reserveData)).format("DD/MM/YYYY"),
				checkin_flexibility: moment(getEarliestReserve(reserveData).startTime, "HH:mm:ss").format("hh:mm A"),
				checkout_flexibility: moment(getLastReserve(reserveData).endTime, "HH:mm:ss").format("hh:mm A"),
				guests: guestCount,
				host_name: spaceHost.firstName,
				view_receipt_url: "",
				download_receipt_url: "",
				help_center_url: "",
				contact_us_url: "",
			},
		};

		const sendUser = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
			...emailContent,
			recipient: user?.email,
			data: {
				...emailContent.data,
				subject_header: `${spaceHost.firstName} sent special offer for ${space.name?.get("en")}! for ${moment().format("DD/MM/YYYY")}-${moment().add(1, "days").format("DD/MM/YYYY")}`,
				sub_subject: `Complete Payment to Confirm Your Booking`,
				user_profile: "",
				host_profile: profileTemplate(spaceHost),
				price_details: priceTemplate("user", reservation),
			},
			subject: `${spaceHost.firstName} sent special offer for ${space.name?.get("en")}! for ${moment().format("DD/MM/YYYY")}-${moment().add(1, "days").format("DD/MM/YYYY")}`,
		});
	} catch (e) {
		console.log("booking", e);
	}
}
export async function userConversation(reservationId, type, message) {
	try {
		const reservation = await Reservation.findOne({ id: reservationId })
			.populate("userDetails")
			.populate("hostDetails")
			.populate("spaceDetails")
			.populate("activityDetails")
			.populate("spaceTypeDetails");

		const space = reservation.spaceDetails;
		const spaceType = reservation.spaceTypeDetails;
		const user = reservation.userDetails;
		const spaceHost = reservation?.hostDetails;
		const { guestCount, reserveData } = reservation;

		const emailContent = {
			templateId: 21,
			data: {
				main_image_url:
					host +
					"/images/" +
					(space.spacePhotos?.[0]?.image.uploadDir ? space.spacePhotos?.[0]?.image.uploadDir : "") +
					space.spacePhotos?.[0]?.image.src,
				main_image_alt: space?.name?.get("en"),
				listing_title: space?.name?.get("en"),
				listing_type: spaceType?.name?.get("en"),
				directions_url: "",
				address: space.spaceAddress.addressLine1,
				checkin_date: moment(getEarliestDate(reserveData)).format("DD/MM/YYYY"),
				checkout_date: moment(getEndDate(reserveData)).format("DD/MM/YYYY"),
				checkin_flexibility: moment(getEarliestReserve(reserveData).startTime, "HH:mm:ss").format("hh:mm A"),
				checkout_flexibility: moment(getLastReserve(reserveData).endTime, "HH:mm:ss").format("hh:mm A"),
				guests: guestCount,
				host_name: spaceHost.firstName,
				view_receipt_url: "",
				download_receipt_url: "",
				help_center_url: "",
				contact_us_url: "",
				message: message,
				message_to_text: type == "user" ? "Message to Guest" : "Message to Host",
			},
		};

		if (type == "host") {
			const sendUser = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
				...emailContent,
				recipient: user?.email,
				data: {
					...emailContent.data,
					subject_header: `You Got New Message From ${spaceHost?.firstName}`,
					sub_subject: ``,
					user_profile: "",
					host_profile: profileTemplate(spaceHost),
				},
				subject: `You Got New Message From ${spaceHost?.firstName}`,
			});
		} else if (type == "user") {
			const sendHost = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
				...emailContent,
				recipient: spaceHost?.email,
				data: {
					...emailContent.data,
					subject_header: `You Got New Message From ${user?.firstName}`,
					sub_subject: ``,
					user_profile: profileTemplate(user),
					host_profile: "",
				},
				subject: `You Got New Message From ${user?.firstName}`,
			});
		}
	} catch (e) {
		console.log("booking", e);
	}
}
export async function writeReview(reservationId) {
	try {
		const reservation = await Reservation.findOne({ id: reservationId })
			.populate("userDetails")
			.populate("hostDetails")
			.populate("spaceDetails")
			.populate("activityDetails")
			.populate("spaceTypeDetails");

		const user = reservation.userDetails;
		const spaceHost = reservation?.hostDetails;

		const emailContent = {
			templateId: 25,
		};

		const sendUser = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
			...emailContent,
			recipient: user?.email,
			data: {
				name: user?.firstName,
				user_name: spaceHost?.firstName,
				review_link: "",
			},
			subject: `Leave a review for your recent booking`,
		});

		const sendHost = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
			...emailContent,
			recipient: spaceHost?.email,
			data: {
				name: spaceHost?.firstName,
				user_name: user?.firstName,
				review_link: "",
			},
			subject: `Leave a review for your recent booking`,
		});
	} catch (e) {
		console.log("booking", e);
	}
}

export async function requestRemainder(reservationId, hours) {
	try {
		const reservation = await Reservation.findOne({ id: reservationId })
			.populate("userDetails")
			.populate("hostDetails")
			.populate("spaceDetails")
			.populate("activityDetails")
			.populate("spaceTypeDetails");
		if (reservation.status !== "pending") return;
		console.log("remainder check");
		const space = reservation.spaceDetails;
		const spaceType = reservation.spaceTypeDetails;
		const user = reservation.userDetails;
		const spaceHost = reservation?.hostDetails;
		const { guestCount, payout, code, reserveData } = reservation;

		const emailContent = {
			templateId: 14,
			data: {
				main_image_url:
					host +
					"/images/" +
					(space.spacePhotos?.[0]?.image.uploadDir ? space.spacePhotos?.[0]?.image.uploadDir : "") +
					space.spacePhotos?.[0]?.image.src,
				main_image_alt: space?.name?.get("en"),
				listing_title: space?.name?.get("en"),
				listing_type: spaceType?.name?.get("en"),
				directions_url: "",
				checkin_date: moment(getEarliestDate(reserveData)).format("DD/MM/YYYY"),
				checkout_date: moment(getEndDate(reserveData)).format("DD/MM/YYYY"),
				checkin_flexibility: moment(getEarliestReserve(reserveData).startTime, "HH:mm:ss").format("hh:mm A"),
				checkout_flexibility: moment(getLastReserve(reserveData).endTime, "HH:mm:ss").format("hh:mm A"),
				user_name: user?.firstName,
				hours: hours,
				guests: guestCount,
				view_receipt_url: "",
				download_receipt_url: "",
				help_center_url: "",
				contact_us_url: "",
			},
		};

		const sendHost = await emailManagementResolver.Mutation.sendEmailTemplate(null, {
			...emailContent,
			recipient: spaceHost?.email,
			data: {
				...emailContent.data,
				subject_header: `${user?.firstName} request will expire in ${hours} Hours`,
				sub_subject: ``,
				user_profile: profileTemplate(user),
				host_profile: "",
				message_button_txt: "Message to Guest",
				message_url: "#",
				price_details: priceTemplate("host", reservation),
			},
			subject: `${user?.firstName} request will expire in ${hours} Hours`,
		});
	} catch (e) {
		console.log("booking", e);
	}
}
