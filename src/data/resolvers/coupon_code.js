import { gql } from "apollo-server-express";

import CouponCode from "../models/coupon_code.js";

export const couponCodeTypeDef = gql`
	type Query {
		getCouponCodes(filters: JSON): [CouponCode]
		getCouponCode(id: Int): CouponCode
	}
	type Mutation {
		createCouponCode(input: CouponCodeInput): Boolean
		updateCouponCode(id: Int!, input: CouponCodeInput): Boolean
		deleteCouponCode(id: Int!): Boolean
	}
`;

const couponCodeQueryDef = {
	getCouponCodes: async (_, { filters }, context) => {
		const couponCodes = await CouponCode.find({});
		return couponCodes;
	},
	getCouponCode: async (_, { id }, context) => {
		return await CouponCode.findOne({ id });
	},
};

const couponCodeMutationDef = {
	createCouponCode: async (_, { input }, context) => {
		try {
			// Check if the code already exists
			const existingCoupon = await CouponCode.findOne({ code: input.code });
			if (existingCoupon) {
				throw new Error("duplicate_code");
			}

			// Create a new coupon code
			const couponCode = new CouponCode(input);
			await couponCode.save();
			return true;
		} catch (e) {
			throw new Error(e.message || "Failed to create coupon code");
		}
	},

	updateCouponCode: async (_, { id, input }, context) => {
		try {
			// Find the existing coupon code by ID
			const couponCode = await CouponCode.findOne({ id });
			if (!couponCode) {
				throw new Error("Coupon code not found");
			}

			// Check for duplicate code only if the code is being updated

			if (input.code && input.code !== couponCode.code) {
				const existingCoupon = await CouponCode.findOne({ code: input.code });

				if (existingCoupon) {
					throw new Error("duplicate_code");
				}
			}

			// Update the coupon code
			Object.assign(couponCode, input);
			await couponCode.save();
			return true;
		} catch (e) {
			throw new Error(e.message || "Failed to update coupon code");
		}
	},

	deleteCouponCode: async (_, { id }) => {
		const result = await CouponCode.findOneAndDelete({ id });
		return result.deletedCount > 0;
	},
};

const couponCodeResolver = {
	Query: couponCodeQueryDef,
	Mutation: couponCodeMutationDef,
};

export default couponCodeResolver;
