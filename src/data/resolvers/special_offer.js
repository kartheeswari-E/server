import SpecialOffer from "../models/special_offer.js";
import Reservation from "../models/reservation.js";
import { calculatePricing } from "../../utils/reserve_service.js";
import { gql } from "apollo-server-express";
import GlobalSetting from "../models/global_setting.js";
import Currency from "../models/currency.js";
import Space from "../models/space.js";
import { numberFormat } from "../../utils/helpers.js";
import reservationResolver from "./reservation.js";
import { specialOfferSent } from "../../services/email_management_service.js";

export const specialOfferTypeDef = gql`
	type Query {
		getSpecialOffers(filters: JSON): [SpecialOffer]
		specialOfferCalculation(
			spaceId: Int
			subTotal: Int
			activityType: Int
			guest: Int
			totalHours: Int
			input: [PriceCalculationInput]
		): PriceCalculation
	}

	type Mutation {
		createSpecialOffer(input: SpecialOfferInput): SpecialOffer
	}
`;

const specialOfferQueryDef = {
	getSpecialOffers: async (_, { filters }) => {
		return await SpecialOffer.find(filters || {});
	},
	specialOfferCalculation: async (_, { spaceId, subTotal, activityType, guest, totalHours, input }, context) => {
		const settings = await GlobalSetting.findOne();
		const currency = await Currency.findOne({ code: settings.defaultCurrency });

		let space = await Space.findOne({ id: spaceId, deletedAt: null });
		if (!space) {
			throw new Error("Space not found");
		}

		const hourlyRate = subTotal / totalHours;

		const baseAmount = subTotal;

		// Calculate pricing with utility function
		const pricingResult = await calculatePricing({
			baseAmount,
		});

		const total = pricingResult.totalPrice + pricingResult.serviceFee;

		// Prepare response
		return {
			total,
			hourlyRate,
			totalPrice: pricingResult.totalPrice,
			subTotal: baseAmount,
			totalHours,
			serviceFee: pricingResult.serviceFee,
			hostPayout: pricingResult.hostPayout,
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

const specialOfferMutationDef = {
	createSpecialOffer: async (_, { input }) => {
		try {
			// Fetch the reservation linked to this special offer
			const reservation = await Reservation.findOne({ id: input.reservationId });
			if (!reservation) {
				throw new Error("Reservation not found");
			}

			// Calculate pricing based on the adjusted subtotal
			const { subTotal } = input;
			const hourlyPrice = subTotal / reservation.totalHours;

			const { serviceFee, vendorFee, totalPrice, discountAmount, discountType } = await calculatePricing({
				baseAmount: subTotal,
			});

			// Create the special offer
			const specialOffer = new SpecialOffer({
				...input,
				hourlyPrice,
				totalHours: reservation.totalHours,
				total: totalPrice,
				serviceFee,
				vendorFee,
			});

			await specialOffer.save();
			const reservationInput = {
				id: input.reservationId,
				input: {
					status: "pre_accepted",
				},
			};
			await reservationResolver.Mutation.updateReservation(_, reservationInput);

			await specialOfferSent(input.reservationId);

			return specialOffer;
		} catch (error) {
			throw new Error("Error creating special offer");
		}
	},
};

const specialOfferResolver = {
	Query: specialOfferQueryDef,
	Mutation: specialOfferMutationDef,
};

export default specialOfferResolver;
