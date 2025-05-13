import { gql } from "apollo-server-express";

const payoutTypes = gql`
	type HostPayout {
		currencyCode: String
		amount: Float
		status: String
		transactionId: String
	}

	type Refund {
		status: String
		transactionId: String
	}

	type Payout {
		id: Int
		code: String
		confirmationCode: String
		spaceId: Int
		hostId: Int
		userId: Int
		user: String
		space: TranslatableString
		guestCount: Int
		currencyCode: String
		couponType: String
		couponCode: String
		couponPrice: Float
		cleaningFee: Float
		serviceFee: Float
		subTotal: Float
		vendorFee: Float
		total: Float
		reserveData: [ReserveData]
		paymentCurrency: String
		transactionId: String
		paymentMethod: String
		cancellationPolicyData: String
		status: String
		isNotAvailable: Boolean
		review: Review
		cancelledBy: String
		cancelReason: String
		cancelledAt: Date
		payout: HostPayout
		refund: Refund
		payoutStatus: String
		userType: String
		amount: Float
		createdAt: Date
		updatedAt: Date
	}
`;

export default payoutTypes;
