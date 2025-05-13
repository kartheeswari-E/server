// Path: resolvers/spaceResolver.js

import { gql } from "apollo-server-express";
import uploadFile from "../../utils/file_uploader.js";
import Space from "../models/space.js";
import ActivityType from "../models/activity_type.js";
import Activity from "../models/activity.js";
import Currency from "../models/currency.js";
import GlobalSetting from "../models/global_setting.js";
import { calculatePricing, normalizeDate } from "../../utils/reserve_service.js";
import { numberFormat } from "../../utils/helpers.js";
import SpecialOffer from "../models/special_offer.js";
import Reservation from "../models/reservation.js";
import SpaceAvailability from "../models/space_availability.js";
import moment from "moment";
import User from "../models/user.js";
import Review from "../models/review.js";
import emailManagementResolver from "./email_management.js";

export const spaceTypeDef = gql`
	type Query {
		getSpaces(filters: JSON): [Space]
		getSpace(id: Int, userId: Int): Space
		priceCalculation(input: PriceCalculationInput): PriceCalculation
	}

	type Mutation {
		createSpace(input: CreateSpaceInput): Space
		updateSpaceLocation(id: Int!, input: SpaceUpdateLocationInput): Boolean
		updateSpaceAbout(id: Int!, input: SpaceUpdateAboutInput): Boolean
		updateSpaceDetails(id: Int!, input: SpaceUpdateDetailsInput): Boolean
		updateSpacePhotos(id: Int!, input: SpaceUpdatePhotosInput): Boolean
		updateSpaceVideo(id: Int!, input: SpaceUpdateVideoInput): Boolean
		updateSpaceBooking(id: Int!, input: SpaceUpdateBookingInput): Boolean
		updateSpaceAvailability(id: Int!, input: SpaceUpdateAvailabilityInput): Boolean
		updateSpaceActivity(id: Int!, input: SpaceUpdateActivityInput): Boolean
		updateSpaceStatus(id: Int!, input: SpaceUpdateStatusInput): Boolean
		deleteSpacePhoto(spaceId: Int!, id: Int!): Boolean
		deleteSpace(id: Int!): Boolean
		duplicateSpace(id: Int!): Space
	}
`;

function generateSlug(name) {
	return name?.toLowerCase()?.replace(/\s+/g, "-");
}

async function sendUpdateMail(spaceId) {
	const space = await Space.findOne({ id: spaceId });
	const user = await User.findOne({ id: space.userId });
	if (space?.adminStatus !== "approved") return;

	const spaceName = space.name?.get("en");
	const name = user.firstName;
	const email = user.email;
	const emailContent = {
		templateId: 6,
		data: {
			name: name,
			room_name: spaceName,
			date: moment().format("DD/MM/YYYY hh:mm A"),
		},
		subject: `${spaceName} Details Updated`,
		recipient: email,
	};
	const sendEmail = await emailManagementResolver.Mutation.sendEmailTemplate(null, emailContent);
}
const spaceQueryDef = {
	getSpaces: async (_, { filters }) => {
		const spaces = await Space.find({ ...filters })
			.populate("userDetail")
			.populate("spaceTypeDetail")
			.populate("spaceReviews");

		// Map through the results to format the data
		const activityType = await ActivityType.find();
		const activity = await Activity.find();

		const formattedSpaces = spaces.map(async (spaceData) => {
			let space = { ...spaceData.toObject() };
			space["spaceTypeName"] = spaceData?.spaceTypeDetail?.name;
			space["userImage"] = spaceData?.userDetail?.image;
			space["userName"] = spaceData?.userDetail?.firstName;

			async function spaceReviewCount() {
				const reviews = await spaceData?.spaceReviews.filter((review) => review?.userType === "user");
				const now = new Date();
				const aboutReviewsFilter = [];
				let totalRating = 0;
				let ratingCount = 0;
				let spaceReviews = [];
				function checkValue(value) {
					return Boolean(value?.privateReview && value?.publicReview);
				}

				await Promise.all(
					reviews.map(async (review) => {
						const { privateReview, publicReview, expireDate, userType, rating } = review;
						const reservationReviews = await Review.find({ reservationId: review.reservationId });
						const hostReview = reservationReviews.find((data) => data.userType === "host");
						const hostCheck = checkValue(hostReview);
						const reservation = await Reservation.findOne({ id: review.reservationId });
						const fromUserDetail = await User.findOne({ id: review.fromUser });
						const toUserDetail = await User.findOne({ id: review.toUser });
						const isExpired = new Date(expireDate) < now;

						let show = false;

						if (!privateReview && !publicReview) return;

						if ((userType === "user" && hostCheck) || isExpired) {
							show = true;
						}

						if (!show) return;
						aboutReviewsFilter.push(review);
						if (rating && show) {
							const reviewData = {
								...review.toObject(),
								reservationCode: reservation.code,
								fromName: fromUserDetail.firstName,
								toName: toUserDetail.firstName,
								fromImage: fromUserDetail.image,
								toImage: toUserDetail.image,
								spaceName: space?.name?.get("en"),
								fromCreatedAt: fromUserDetail?.createdAt,
								toCreatedAt: toUserDetail?.createdAt,
							};
							spaceReviews.push(reviewData);
							totalRating += rating;
							ratingCount++;
						}
					}),
				);

				const averageRating = ratingCount > 0 ? totalRating / ratingCount : 0;

				return { averageRating, ratingCount, spaceReviews };
			}
			const { averageRating, ratingCount, spaceReviews } = await spaceReviewCount();
			space["starRating"] = averageRating;
			space["totalRating"] = ratingCount;
			space["reviews"] = spaceReviews;

			if (space.activity?.length > 0) {
				space.activity = space.activity.map((data) => {
					const activityTypeName = activityType.find((activityTypeData) => data.type == activityTypeData.id);
					const activityName = activity
						.filter((activityData) => activityData.activityType == data.type)
						.map((activityData) => activityData?.name);
					return {
						...data,
						activityTypeName: activityTypeName?.name,
						activityName: activityName,
					};
				});
			}

			return space; // Return the formatted space data
		});

		return formattedSpaces; // Return the formatted spaces
	},
	getSpace: async (_, { id, userId }) => {
		const activityType = await ActivityType.find();
		const activity = await Activity.find();
		let spaceData = {};
		let space = await Space.findOne({ id }).populate("userDetail").populate("spaceTypeDetail").populate("spaceReviews");

		if (!space) throw new Error("space_not_found");

		spaceData["spaceTypeName"] = space?.spaceTypeDetail?.name;
		spaceData["userImage"] = space?.userDetail?.image;
		spaceData["userName"] = space?.userDetail?.firstName;

		async function spaceReviewCount() {
			const reviews = await space?.spaceReviews.filter((review) => review?.userType === "user");
			const now = new Date();
			const aboutReviewsFilter = [];
			let totalRating = 0;
			let ratingCount = 0;
			let spaceReviews = [];
			function checkValue(value) {
				return Boolean(value?.privateReview && value?.publicReview);
			}

			await Promise.all(
				reviews.map(async (review) => {
					const { privateReview, publicReview, expireDate, userType, rating } = review;
					const reservationReviews = await Review.find({ reservationId: review.reservationId });
					const hostReview = reservationReviews.find((data) => data.userType === "host");
					const hostCheck = checkValue(hostReview);
					const reservation = await Reservation.findOne({ id: review.reservationId });
					const fromUserDetail = await User.findOne({ id: review.fromUser });
					const toUserDetail = await User.findOne({ id: review.toUser });
					const isExpired = new Date(expireDate) < now;

					let show = false;

					if (!privateReview && !publicReview) return;

					if ((userType === "user" && hostCheck) || isExpired) {
						show = true;
					}

					if (!show) return;
					aboutReviewsFilter.push(review);
					if (rating && show) {
						const reviewData = {
							...review.toObject(),
							reservationCode: reservation.code,
							fromName: fromUserDetail.firstName,
							toName: toUserDetail.firstName,
							fromImage: fromUserDetail.image,
							toImage: toUserDetail.image,
							spaceName: space?.name?.get("en"),
							fromCreatedAt: fromUserDetail?.createdAt,
							toCreatedAt: toUserDetail?.createdAt,
						};
						spaceReviews.push(reviewData);
						totalRating += rating;
						ratingCount++;
					}
				}),
			);

			const averageRating = ratingCount > 0 ? totalRating / ratingCount : 0;
			return { averageRating, ratingCount, spaceReviews };
		}
		const { averageRating, ratingCount, spaceReviews } = await spaceReviewCount();
		space["starRating"] = averageRating;
		space["totalRating"] = ratingCount;
		spaceData["reviews"] = spaceReviews;

		const spaceActivity = space.activity.map(async (data) => {
			const activityTypeName = activityType.find((activityTypeData) => data.type == activityTypeData.id)?.name;
			const activityName = activity
				.filter((activityData) => activityData.activityType == data.type)
				.map((activityData) => {
					return { id: activityData.id, name: activityData?.name };
				});

			return {
				...data.toObject(),
				activityTypeName: activityTypeName,
				activityName: activityName,
			};
		});

		return { ...space.toObject(), activity: await Promise.all(spaceActivity), ...spaceData }; // Return the formatted space data
	},
	priceCalculation: async (_, { input }, context) => {
		const { spaceId, activityType, guest, reservationId, specialOfferId, selectedData } = input;

		const settings = await GlobalSetting.findOne();
		const currency = await Currency.findOne({ code: settings.defaultCurrency });

		const space = await Space.findOne({ id: spaceId, deletedAt: null });
		if (!space) {
			throw new Error("Space not found");
		}

		let hourlyRate = 0;
		let totalHours = 0;
		let cleaningFee = 0;
		let baseAmount = 0;
		let discountsApplied = false;
		let reservation = null;
		let specialOffer = null;
		let stayDiscount;
		let earlyDiscount;

		// Helper function to check availability
		const checkAvailability = async (spaceId, reserveData) => {
			for (const { date, startTime, endTime } of reserveData) {
				const dayOfWeek = moment(date).format("dddd").toLowerCase();
				const dayAvailability = space.availability[dayOfWeek];
				if (!dayAvailability?.openStatus) {
					throw new Error(`Space is closed on ${dayOfWeek}`);
				}

				const requestedStartTime = normalizeDate(date, startTime);
				const requestedEndTime = normalizeDate(date, endTime);
				const openTime = normalizeDate(date, dayAvailability.openTime);
				const closeTime = normalizeDate(date, dayAvailability.closeTime);

				if (moment(requestedStartTime).isBefore(openTime) || moment(requestedEndTime).isAfter(closeTime)) {
					throw new Error(`Requested time is outside open hours on ${dayOfWeek}`);
				}

				if (moment(requestedEndTime).isSameOrBefore(requestedStartTime)) {
					throw new Error(`Invalid time range: ${startTime} to ${endTime}`);
				}

				const conflicts = await SpaceAvailability.find({
					spaceId,
					reserveDate: moment(date).startOf("day").toISOString(),
					available: false,
					$or: [
						{
							reserveStartTime: { $lt: requestedEndTime.toISOString() },
							reserveEndTime: { $gt: requestedStartTime.toISOString() },
						},
					],
				}).countDocuments();

				if (conflicts > 0) {
					throw new Error(`status:not_available,message:Those times are not available.`);
				}
			}
		};

		// Condition 1: Check for reservation
		if (reservationId && !specialOfferId) {
			reservation = await Reservation.findOne({ id: reservationId });
			if (!reservation) {
				throw new Error("Reservation not found");
			}

			// Check availability from reservation data
			await checkAvailability(spaceId, reservation.reserveData);

			hourlyRate = reservation.hourlyPrice;
			totalHours = reservation.totalHours;
			baseAmount = reservation.subTotal;
			cleaningFee = reservation.cleaningFee || 0;
			discountsApplied = reservation.appliedDiscount ? true : false;

			return {
				total: reservation.total,
				hourlyRate,
				totalPrice: reservation.total,
				subTotal: reservation.subTotal,
				totalHours,
				serviceFee: reservation.serviceFee,
				cleaningFee: reservation.cleaningFee,
				securityFee: reservation.securityFee,
				appliedDiscount: reservation.appliedDiscount,
				discountType: reservation.discountType,
				hostPayout: reservation.payout.amount,
				vendorFee: reservation.vendorFee,
				paymentMethods: [{ key: "stripe", value: "Stripe", displayName: "Credit or Debit Card" }],
				pricingForm: [
					{
						key: "Total",
						value: currency.symbol + "" + numberFormat(reservation.total),
						classNames: "fw-bold border-top",
					},
				],
			};
		}

		// Condition 2: Check for special offer
		if (specialOfferId) {
			reservation = await Reservation.findOne({ id: reservationId });
			if (!reservation) {
				throw new Error("Reservation not found");
			}

			specialOffer = await SpecialOffer.findOne({ id: specialOfferId, status: "active" });
			if (!specialOffer) {
				throw new Error("Special offer not found or expired");
			}
			// Validate special offer availability
			await checkAvailability(spaceId, reservation.reserveData);

			hourlyRate = specialOffer.hourlyPrice;
			totalHours = specialOffer.totalHours;
			baseAmount = specialOffer.subTotal;
		}

		// Condition 3: Default availability check and discount application
		if (!specialOfferId && !reservationId) {
			const selectedActivity = space.activity?.find((data) => data.type === activityType);
			if (!selectedActivity) {
				throw new Error("Activity not found for the space");
			}

			hourlyRate = selectedActivity.pricePerHour || 0;
			cleaningFee = selectedActivity.cleaningFee || 0;

			if (guest > selectedActivity.maxGuest) {
				throw new Error(`status:guest_limit,message:Maximum Guest is ${selectedActivity.maxGuest}`);
			}

			await checkAvailability(spaceId, selectedData);

			for (const entry of selectedData) {
				const { date, startTime, endTime } = entry;
				const durationInHours = moment.duration(moment(normalizeDate(date, endTime)).diff(moment(normalizeDate(date, startTime)))).asHours();

				totalHours += durationInHours;

				if (durationInHours < selectedActivity.minHours) {
					throw new Error(`status:not_available,message:Minimum Booking is ${selectedActivity.minHours} Hours.`);
				}
				if (durationInHours > selectedActivity.maxHours) {
					throw new Error(`status:not_available,message:Maximum Booking is ${selectedActivity.maxHours} Hours.`);
				}
			}

			baseAmount = hourlyRate * totalHours;

			// Apply discounts only if conditions are met
			stayDiscount = selectedActivity.stayDiscount
				?.sort((a, b) => parseInt(b?.period) - parseInt(a?.period))
				?.find((discount) => totalHours >= parseFloat(discount.period));

			const earlyDiscountDate = moment(selectedData?.[0]?.date || Date.now());
			const daysUntilBooking = earlyDiscountDate.diff(moment(), "days");

			earlyDiscount = selectedActivity.earlyDiscount
				?.sort((a, b) => parseInt(b?.period) - parseInt(a?.period))
				?.find((discount) => daysUntilBooking >= parseFloat(discount.period));

			if (stayDiscount || earlyDiscount) {
				discountsApplied = true;
			}
		}

		const pricingResult = await calculatePricing({
			baseAmount,
			cleaningFee,
			applyDiscount: discountsApplied,
			discountInfo: {
				stayDiscount: stayDiscount ? { percentage: parseFloat(stayDiscount.percentage) } : null,
				earlyDiscount: earlyDiscount ? { percentage: parseFloat(earlyDiscount.percentage) } : null,
			},
		});

		const total = pricingResult.totalPrice + pricingResult.serviceFee + cleaningFee;

		return {
			total,
			hourlyRate,
			totalPrice: pricingResult.totalPrice,
			subTotal: baseAmount,
			totalHours: Math.round(totalHours),
			serviceFee: pricingResult.serviceFee,
			cleaningFee,
			appliedDiscount: pricingResult.discountAmount,
			discountType: pricingResult.discountType,
			hostPayout: pricingResult.hostPayout,
			vendorFee: pricingResult.vendorFee,
			paymentMethods: [{ key: "stripe", value: "Stripe", displayName: "Credit or Debit Card" }],
			pricingForm: [
				{
					key: "Total",
					value: currency.symbol + "" + numberFormat(total),
					classNames: "fw-bold border-top",
				},
			],
		};
	},
};

const spaceMutationDef = {
	createSpace: async (_, { input }) => {
		try {
			const photos = [];
			if (input.spacePhotos && Array.isArray(input.spacePhotos)) {
				for (let i = 0; i < input.spacePhotos.length; i++) {
					const photo = input.spacePhotos[i];
					const result = await uploadFile(photo, {
						uploadPath: "spaces",
						namePrefix: `space_photo_${i}`,
						addTime: true,
					});
					photos.push({
						id: i + 1,
						image: {
							src: result.name,
							uploadDriver: result.uploadDriver,
							uploadDir: result.uploadDir,
						},
						orderId: i + 1,
					});
				}
			}

			const data = {
				...input,
				spacePhotos: photos,
			};

			const space = new Space(data);

			const savedSpace = await space.save();

			return savedSpace;
		} catch (error) {
			throw new Error("Failed to create space");
		}
	},

	updateSpaceLocation: async (_, { id, input }) => {
		try {
			await Space.findOneAndUpdate({ id }, { $set: { spaceAddress: input } });
			await sendUpdateMail(id);
			return true;
		} catch (error) {
			console.log("error", error);
			throw new Error("Failed to update space location");
		}
	},

	// About Tab: Updates fields related to basic details about the space
	updateSpaceAbout: async (_, { id, input }) => {
		try {
			await Space.findOneAndUpdate(
				{ id },
				{
					$set: {
						name: input.name,
						description: input.description,
						maxSpace: input.maxSpace,
						spaceType: input.spaceType,
						roomCount: input.roomCount,
						restRoomCount: input.restRoomCount,
						wifiName: input.wifiName,
						wifiPwd: input.wifiPwd,
						spaceRules: input.spaceRules,
						isRecommended: input.isRecommended,
					},
				},
			);
			await sendUpdateMail(id);
			return true;
		} catch (error) {
			throw new Error("Failed to update space about section");
		}
	},

	// Detail Tab: Updates details about amenities and services
	updateSpaceDetails: async (_, { id, input }) => {
		try {
			await Space.findOneAndUpdate(
				{ id },
				{
					$set: {
						guestAccesses: input.guestAccesses,
						specialFeatures: input.specialFeatures,
						otherGuestAccesses: input.otherGuestAccesses,
						amenities: input.amenities,
						services: input.services,
						otherServices: input.otherServices,
						spaceStyles: input.spaceStyles,
					},
				},
			);
			await sendUpdateMail(id);
			return true;
		} catch (error) {
			throw new Error("Failed to update space details section");
		}
	},

	// Photo Tab: Updates only the space photos
	updateSpacePhotos: async (_, { id, input }) => {
		const space = await Space.findOne({ id });
		if (!space) throw new Error("Space not found");

		const images = Array.isArray(space.spacePhotos) ? [...space.spacePhotos] : [];
		const lastPhoto = images.length > 0 ? images[images.length - 1] : null;
		let lastId = lastPhoto ? lastPhoto.id + 1 : parseInt(id + "1");

		// Add new photos
		if (Array.isArray(input.spacePhotos)) {
			for (const [index, photo] of input.spacePhotos.entries()) {
				const result = await uploadFile(photo, {
					uploadPath: "spaces",
					namePrefix: `space_${index}`,
					addTime: true,
				});

				const data = {
					id: lastId++,
					image: {
						src: result.name,
						uploadDriver: result.uploadDriver,
						uploadDir: result.uploadDir,
					},
				};
				images.push(data);
			}
		}

		space.spacePhotos = images;
		await space.save();

		await sendUpdateMail(id);
		return true;
	},

	// Video Tab: Updates only the space video link
	updateSpaceVideo: async (_, { id, input }) => {
		try {
			await Space.findOneAndUpdate(
				{ id },
				{
					$set: { spaceVideo: input.spaceVideo },
				},
			);
			await sendUpdateMail(id);
			return true;
		} catch (error) {
			throw new Error("Failed to update space video");
		}
	},

	// Booking Tab: Updates booking type and cancellation policy
	updateSpaceBooking: async (_, { id, input }) => {
		try {
			await Space.findOneAndUpdate(
				{ id },
				{
					$set: {
						bookingType: input.bookingType,
						cancellationPolicy: input.cancellationPolicy,
					},
				},
			);

			await sendUpdateMail(id);
			return true;
		} catch (error) {
			throw new Error("Failed to update space booking details");
		}
	},

	// Availability Tab: Updates availability information
	updateSpaceAvailability: async (_, { id, input }) => {
		try {
			await Space.findOneAndUpdate(
				{ id },
				{
					$set: { availability: input },
				},
			);

			await sendUpdateMail(id);
			return true;
		} catch (error) {
			throw new Error("Failed to update space availability");
		}
	},

	// Activity Tab: Updates only the activity section
	updateSpaceActivity: async (_, { id, input }) => {
		try {
			await Space.findOneAndUpdate(
				{ id },
				{
					$set: { activity: input.activity },
				},
			);

			await sendUpdateMail(id);
			return true;
		} catch (error) {
			throw new Error("Failed to update space activity section");
		}
	},
	updateSpaceStatus: async (_, { id, input }) => {
		try {
			const space = await Space.findOne({ id });
			const user = await User.findOne({ id: space.userId });
			await Space.findOneAndUpdate(
				{ id },
				{
					$set: { status: input.status, adminStatus: input.adminStatus, resubmitReason: input.resubmitReason },
				},
			);
			if (!user.hostStatus && input.adminStatus === "approved") {
				await User.findOneAndUpdate({ id: user.id }, { $set: { hostStatus: true } });
			}
			let emailContent = {};
			if (input.adminStatus === "approved" && (space.adminStatus == "pending" || space.adminStatus == "resubmit")) {
				emailContent = {
					templateId: 9,
					data: {
						name: user.firstName,
						room_name: space.name.get("en"),
					},
					subject: "Your listing approved on Hyra Space",
					recipient: user.email,
				};
			} else if (input.adminStatus === "resubmit" && (space.adminStatus == "pending" || space.adminStatus == "approved")) {
				emailContent = {
					templateId: 29,
					data: {
						name: user?.firstName,
						room_name: space.name.get("en"),
						resubmit_reason: input.resubmitReason,
						update_url: "",
					},
					subject: `Resubmit Your listing ${space.name.get("en")}`,
					recipient: user.email,
				};
			} else if (space.adminStatus === "approved" && (input.status === "listed" || input.status === "unListed")) {
				emailContent = {
					templateId: 7,
					data: {
						name: user.firstName,
						room_name: space.name.get("en"),
						content:
							input.status === "listed"
								? `<p>Congratulations! Your room <a class="link" href="">${space.name?.get("en")}</a> was listed in Hyra Space at ${moment().format("DD/MM/YYYY")}.</p>
             					  <p>If your listing is not ready for hosting, go to <a class="link" href="">Manage Listing</a> to unlist it.</p>`
								: `<p> Your room <a class="link" href="">${space.name?.get("en")}</a> was deactivated from your Hyra Space account at ${moment().format("DD/MM/YYYY")}.</p>
             					  <p>Go to <a class="link" href="">Manage Listing</a> to list it again.</p>`,
						date: moment().format("DD/MM/YYYY"),
						// subject: `Your listing ${space.name.get("en")} has been listed on Hyra Space`,
					},
					subject:
						input.status === "listed"
							? `Your listing ${space.name.get("en")} has been listed on Hyra Space`
							: `Your listing ${space.name.get("en")} has been deactivated from Hyra Space`,
					recipient: user.email,
				};
			}
			if (emailContent?.templateId) {
				const sendEmail = await emailManagementResolver.Mutation.sendEmailTemplate(_, emailContent);
			}

			return true;
		} catch (error) {
			console.log("error", error);
			throw new Error("Failed to update space activity section");
		}
	},

	// Deletes a specific photo from the space photos array
	deleteSpacePhoto: async (_, { spaceId, id }) => {
		try {
			await Space.findOneAndUpdate({ id: spaceId, "spacePhotos.id": id }, { $pull: { spacePhotos: { id: id } } });
			return true;
		} catch (error) {
			throw new Error("Failed to delete space photo");
		}
	},
	deleteSpace: async (_, { id }) => {
		try {
			const result = await Space.deleteOne({ id });
			if (result.deletedCount === 0) {
				throw new Error("Space not found");
			}
			return true;
		} catch (error) {
			throw new Error("Failed to delete space");
		}
	},
	// Add this function to your spaceMutationDef object

	duplicateSpace: async (_, { id }) => {
		try {
			const existingSpace = await Space.findOne({ id });
			if (!existingSpace) throw new Error("Space not found");

			// Create a new object without the _id field
			const { _id, ...newSpaceData } = existingSpace.toObject(); // Destructure to exclude _id

			const newSpace = new Space({ ...newSpaceData, id: undefined }); // Create a new instance without _id

			const savedSpace = await newSpace.save();
			return savedSpace;
		} catch (error) {
			throw new Error("Failed to duplicate space");
		}
	},
};

// Resolver setup
const spaceResolver = {
	Query: spaceQueryDef,
	Mutation: spaceMutationDef,
};

export default spaceResolver;
