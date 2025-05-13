import { CronJob } from "cron";
import Reservation from "../data/models/reservation.js";
import SpecialOffer from "../data/models/special_offer.js";
import Conversation from "../data/models/conversation.js";
import Review from "../data/models/review.js";
import moment from "moment";
import { requestExpired, requestRemainder, writeReview } from "./email_management_service.js";

const job = new CronJob(
	"* * * * *",
	async function () {
		console.log("Running the expiration job for every minute");

		try {
			const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
			const currentDate = new Date();

			// Expire pending reservations and add messages
			const expiredPendingReservations = await Reservation.find({
				createdAt: { $lt: twentyFourHoursAgo },
				status: { $in: ["pending"] },
			});
			const pending = await Reservation.updateMany(
				{
					createdAt: { $lt: twentyFourHoursAgo },
					status: { $in: ["pending"] },
				},
				{
					status: "expired",
					expiredBy: "vendor",
					updatedAt: new Date(),
				},
			);
			console.log(`${pending.modifiedCount} inquiries have been marked as expired.`);

			for (const reservation of expiredPendingReservations) {
				await requestExpired(reservation.id);

				await Conversation.findOneAndUpdate(
					{ reservationId: reservation.id },
					{
						$push: {
							messages: {
								userFrom: reservation.userId,
								userTo: reservation.hostId,
								messageType: "booking_expired",
								message: "",
								read: false,
							},
						},
						$set: { lastMessage: "", hostRead: false, guestRead: false },
					},
				);
			}

			// Expire pre-accepted reservations and add messages
			const expiredPreAcceptedReservations = await Reservation.find({
				status: "pre_accepted",
				"reserveData.date": { $lt: currentDate.toISOString().split("T")[0] },
			});
			const preAccepted = await Reservation.updateMany(
				{
					status: "pre_accepted",
					"reserveData.date": { $lt: currentDate.toISOString().split("T")[0] },
				},
				{
					status: "expired",
					expiredBy: "user",
					updatedAt: new Date(),
				},
			);
			console.log(`${preAccepted.modifiedCount} inquiries have been marked as expired.`);

			for (const reservation of expiredPreAcceptedReservations) {
				await requestExpired(reservation.id);
				await Conversation.findOneAndUpdate(
					{ reservationId: reservation.id },
					{
						$push: {
							messages: {
								userFrom: reservation.userId,
								userTo: reservation.hostId,
								messageType: "booking_expired",
								message: "",
								read: false,
							},
						},
						$set: { lastMessage: "", hostRead: false, guestRead: false },
					},
				);
			}

			// Update review status after expiration date
			const expiredReviews = await Review.updateMany(
				{
					expireDate: { $lt: currentDate },
					status: true,
				},
				{
					status: false,
					updatedAt: new Date(),
				},
			);
			console.log(`${expiredReviews.modifiedCount} reviews have been marked as expired.`);

			// Expire active special offers and add messages
			const expiredSpecialOffers = await SpecialOffer.find({
				createdAt: { $lt: twentyFourHoursAgo },
				status: { $in: ["active"] },
			});
			const specialOffer = await SpecialOffer.updateMany(
				{
					createdAt: { $lt: twentyFourHoursAgo },
					status: { $in: ["active"] },
				},
				{
					status: "expired",
					updatedAt: new Date(),
				},
			);
			console.log(`${specialOffer.modifiedCount} special offers have been marked as expired.`);

			console.log("expiredSpecialOffers", expiredSpecialOffers);
			for (const offer of expiredSpecialOffers) {
				await Conversation.findOneAndUpdate(
					{ reservationId: offer.reservationId },
					{
						$push: {
							messages: {
								userFrom: offer.hostId,
								userTo: offer.userId,
								messageType: "special_offer_expired",
								message: "",
								read: false,
							},
						},
						$set: { lastMessage: "", hostRead: false, guestRead: false },
					},
				);
			}

			// successfully completed reservations
			const currentDateTime = moment(); // Current time in the local timezone

			const completedReservations = await Reservation.find({
				status: "accepted",
				reserveData: {
					$elemMatch: {
						date: { $lte: currentDateTime.toISOString() }, // Fetch potentially eligible reservations
					},
				},
			}).lean(); // Use lean for better performance

			const reservationsToComplete = completedReservations.filter((reservation) => {
				// Find the last reservation in reserveData based on date
				const lastReserve = reservation.reserveData.reduce((latest, current) => {
					const currentDate = moment(current.date);
					const latestDate = moment(latest.date);
					return currentDate.isAfter(latestDate) ? current : latest;
				});

				if (!lastReserve) return false;

				// Combine the date and endTime, and convert it to local datetime
				const adjustedEndDateTime = moment(lastReserve.date).startOf("day").add(moment.duration(lastReserve.endTime));

				// Compare the adjusted end datetime with the current datetime
				return adjustedEndDateTime.isSameOrBefore(currentDateTime);
			});

			// Update reservations that need to be marked as completed using the predefined `id`
			const updatedReservations = await Reservation.updateMany(
				{
					id: { $in: reservationsToComplete.map((r) => r.id) },
				},
				{
					status: "completed",
					updatedAt: new Date(),
				},
			);

			console.log(`${updatedReservations.modifiedCount} reservations have been marked as completed.`);

			for (const reservation of reservationsToComplete) {
				await writeReview(reservation.id);
			}

			// request remainder
			const now = new Date();

			function calculateTargetTime(createdAt, hours) {
				const targetTime = new Date(createdAt);
				targetTime.setHours(targetTime.getHours() + hours);
				return targetTime.toISOString().slice(0, 16);
			}

			const currentTimestamp = now.toISOString().slice(0, 16);

			const nineteenHoursToExpire = await Reservation.find({
				createdAt: { $exists: true },
				status: "pending",
			});

			const nineteenFilter = nineteenHoursToExpire.filter((reservation) => {
				return calculateTargetTime(reservation.createdAt, 19) === currentTimestamp;
			});

			for (const reservation of nineteenFilter) {
				await requestRemainder(reservation.id, 5);
			}

			const fiveHoursToExpire = await Reservation.find({
				createdAt: { $exists: true },
				status: "pending",
			});

			const fiveFilter = fiveHoursToExpire.filter((reservation) => {
				return calculateTargetTime(reservation.createdAt, 5) === currentTimestamp;
			});

			for (const reservation of fiveFilter) {
				await requestRemainder(reservation.id, 19);
			}
		} catch (error) {
			console.error("Error in updating expired inquiries:", error);
		}
	},
	null,
	true,
	"Asia/Kolkata",
);

export default job;
