import GlobalSetting from "../data/models/global_setting.js";
import SpaceAvailability from "../data/models/space_availability.js";
import moment from "moment";

export const checkAvailability = async ({ spaceId, date, checkInTime, checkOutTime }) => {
	try {
		const startDateTime = new Date(`${date}T${checkInTime}`);
		const endDateTime = new Date(`${date}T${checkOutTime}`);

		const conflictingReservations = await SpaceAvailability.find({
			spaceId,
			reserveDate: date,
			$or: [
				{
					// Existing booking starts before requested end time and ends after requested start time
					reserveStartTime: { $lt: endDateTime },
					reserveEndTime: { $gt: startDateTime },
				},
			],
		});

		// If no conflicting reservations are found, space is available
		return conflictingReservations.length === 0;
	} catch (error) {
		console.error("Error checking availability:", error);
		throw new Error("Failed to check availability.");
	}
};

export const normalizeDate = (date, time) => {
	const parsedDate = moment(date, moment.ISO_8601, true); // Parse date strictly
	if (!parsedDate.isValid()) {
		throw new Error(`Invalid date format: ${date}`);
	}
	if (time) {
		const combined = moment(`${parsedDate.format("YYYY-MM-DD")}T${time}`, moment.ISO_8601, true);
		if (!combined.isValid()) {
			throw new Error(`Invalid time format: ${time}`);
		}
		return combined; // Return moment instance
	}
	return parsedDate; // Return moment instance
};

export const calculatePricing = async ({ baseAmount, cleaningFee = 0, applyDiscount = false, discountInfo = {}, includeCleaningFee = true }) => {
	const settings = await GlobalSetting.findOne();

	// Add cleaning fee to base amount to get initial total price
	let totalPrice = baseAmount;

	// Apply discounts if applicable
	let discountAmount = 0;
	let discountType = null;
	if (applyDiscount && discountInfo) {
		const { stayDiscount, earlyDiscount } = discountInfo;
		const stayDiscountValue = stayDiscount ? (totalPrice * stayDiscount.percentage) / 100 : 0;
		const earlyDiscountValue = earlyDiscount ? (totalPrice * earlyDiscount.percentage) / 100 : 0;

		if (stayDiscountValue > earlyDiscountValue) {
			discountAmount = stayDiscountValue;
			discountType = `${stayDiscount.percentage}% Length Of Stay Discount`;
		} else if (earlyDiscountValue > 0) {
			discountAmount = earlyDiscountValue;
			discountType = `${earlyDiscount.percentage}% Early Bird Discount`;
		}
		totalPrice -= discountAmount;
	}

	// Include cleaning fee only if specified
	const priceWithCleaningFee = includeCleaningFee ? totalPrice + cleaningFee : totalPrice;

	// Calculate service fee
	const minServiceFee = settings?.fee?.minServiceFee || 0;
	let finalServiceFee = 0;

	if (settings?.fee?.serviceFeeType === "fixed") {
		finalServiceFee = settings?.fee?.serviceFee || 0;
	} else if (settings?.fee?.serviceFeeType === "percentage") {
		const serviceFee = (settings?.fee?.serviceFee / 100) * priceWithCleaningFee;
		finalServiceFee = Math.max(serviceFee, minServiceFee);
	}

	// Calculate host payout (subtracting host fee)
	let hostPayout = priceWithCleaningFee; // Start with base amount

	const hostFeeAmount = (settings?.fee?.hostFee / 100) * priceWithCleaningFee;
	hostPayout -= hostFeeAmount;

	const vendorFee = priceWithCleaningFee - hostPayout;

	return {
		baseAmount,
		cleaningFee: includeCleaningFee ? cleaningFee : 0,
		serviceFee: finalServiceFee,
		totalPrice,
		discountAmount,
		discountType,
		hostPayout,
		vendorFee,
	};
};
