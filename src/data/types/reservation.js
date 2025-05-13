import { gql } from "apollo-server-express";

const reservationType = gql`
	type ReserveData {
		date: Date
		startTime: String
		endTime: String
	}

	type Payout {
		currencyCode: String
		amount: Float
		status: String
		transactionId: String
	}

	type Refund {
		amount: Float
		status: String
		transactionId: String
	}

	type Penalty {
		isEnabled: Boolean
		limit: Int
		days: String
		before: Int
		after: Int
	}

	type Reservation {
		id: Int
		code: String
		confirmationCode: String
		listType: String
		userId: Int
		user: String
		userImage: Image
		host: String
		hostImage: Image
		hostNumber: String
		hostEmail: String
		hostReview: Review
		userReview: Review
		space: TranslatableString
		spaceImage: Image
		spaceRules: [Int]
		spaceTypeName: TranslatableString
		activityName: TranslatableString
		hostId: Int
		spaceId: Int
		spaceType: Int
		activityType: Int
		activity: Int
		guestCount: Int
		reserveData: [ReserveData]
		currencyCode: String
		couponType: String
		couponCode: String
		couponPrice: Float
		hourlyPrice: Float
		totalHours: Int
		securityFee: Float
		cleaningFee: Float
		serviceFee: Float
		subTotal: Float
		discountType: String
		appliedDiscount: Float
		vendorFee: Float
		total: Float
		paymentCurrency: String
		spaceAddress: SpaceAddress
		transactionId: String
		payout: Payout
		refund: Refund
		penalty: Penalty
		paymentMethod: String
		cancellationPolicyData: String
		status: String
		expiredBy: String
		isNotAvailable: Boolean
		cancelledBy: String
		cancelReason: String
		cancelledAt: DateTime
		acceptedAt: DateTime
		guestDetails: JSON
		reservationData: JSON
		createdAt: DateTime
		updatedAt: DateTime
	}

	# Input Types for Mutation
	input ReserveDataInput {
		date: String
		startTime: String
		endTime: String
	}

	input PayoutInput {
		currencyCode: String
		amount: Float
		status: String
		transactionId: String
	}

	input RefundInput {
		status: String
		transactionId: String
	}

	input PenaltyInput {
		isEnabled: Boolean
		limit: Int
		days: String
		before: Int
		after: Int
	}

	input ReservationInput {
		userId: Int
		hostId: Int
		spaceId: Int
		specialOfferId: Int
		listType: String
		activityType: Int
		activity: Int
		guestCount: Int
		reserveData: [ReserveDataInput]
		currencyCode: String
		couponType: String
		couponCode: String
		couponPrice: Float
		hourlyPrice: Float
		totalHours: Int
		securityFee: Float
		cleaningFee: Float
		serviceFee: Float
		subTotal: Float
		discountType: String
		appliedDiscount: Float
		vendorFee: Float
		total: Float
		paymentCurrency: String

		transactionId: String
		payout: PayoutInput
		refund: RefundInput
		penalty: PenaltyInput
		paymentMethod: String
		cancellationPolicyData: String
		status: String
		isNotAvailable: Boolean
		cancelledBy: String
		cancelReason: String
		cancelledAt: DateTime
		acceptedAt: DateTime
		guestDetails: JSON
		reservationData: JSON
	}
`;

export default reservationType;
