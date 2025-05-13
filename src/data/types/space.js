import { gql } from "apollo-server-express";

const spaceTypes = gql`
	type Space {
		id: Int
		userId: Int
		userName: String
		name: TranslatableString
		description: TranslatableString
		maxSpace: Int
		spaceType: Int
		spaceTypeName: TranslatableString
		userImage: Image
		roomCount: Int
		restRoomCount: Int
		wifiName: String
		wifiPwd: String
		starRating: Float
		contactEmail: String
		contactNumber: String
		noticeDays: Int
		refundDays: Int
		refundPercentage: Int
		spacePolicy: JSON
		amenities: [Int]
		spaceRules: [Int]
		guestAccesses: [Int]
		specialFeatures: [Int]
		otherGuestAccesses: String
		services: [Int]
		otherServices: String
		spaceAddress: SpaceAddress
		spacePhotos: [SpacePhoto]
		spaceVideo: String
		spaceStyles: [Int]
		activity: [SpaceActivity]
		availability: SpaceAvailability
		bookingType: String
		cancellationPolicy: String
		isRecommended: Boolean
		status: String
		adminStatus: String
		resubmitReason: String
		adminCommission: Int
		rating: Float
		totalRating: Float
		reviews: [Review]
		deletedAt: Date
		createdAt: Date
		updatedAt: DateTime
	}

	type SpaceAddress {
		addressLine1: String
		addressLine2: String
		city: String
		state: String
		countryCode: String
		postalCode: String
		latitude: Float
		longitude: Float
		guidance: String
	}

	type SpacePhoto {
		id: Int
		image: Image
		orderId: Int
	}

	type SpaceActivity {
		type: Int
		status: Boolean
		currencyCode: String
		minHours: Int
		maxHours: Int
		maxGuest: Int
		pricePerHour: Float
		cleaningFee: Float
		securityFee: Float
		activityTypeName: TranslatableString
		activityName: [Activity]
		stayDiscount: [ActivityDiscount]
		earlyDiscount: [ActivityDiscount]
	}

	type ActivityDiscount {
		period: String
		percentage: String
	}

	type SpaceAvailability {
		sunday: SpaceDayAvailability
		monday: SpaceDayAvailability
		tuesday: SpaceDayAvailability
		wednesday: SpaceDayAvailability
		thursday: SpaceDayAvailability
		friday: SpaceDayAvailability
		saturday: SpaceDayAvailability
	}

	type SpaceDayAvailability {
		openStatus: Boolean
		openTime: String
		closeTime: String
	}
	type AvailablePaymentMethods {
		key: String
		value: String
		displayName: String
	}

	type PriceCalculation {
		total: Float
		subTotal: Float
		hourlyRate: Float
		totalPrice: Float
		totalHours: Int
		serviceFee: Float
		cleaningFee: Float
		securityFee: Float
		appliedDiscount: Float
		discountType: String
		hostPayout: Float
		vendorFee: Float
		pricingForm: JSON
		paymentMethods: [AvailablePaymentMethods]
	}

	# Input types for each update mutation
	input SpaceUpdateLocationInput {
		addressLine1: String
		addressLine2: String
		city: String
		state: String
		countryCode: String
		postalCode: String
		latitude: Float
		longitude: Float
		guidance: String
	}

	input SpaceUpdateAboutInput {
		name: JSON
		description: JSON
		maxSpace: Int
		spaceType: Int
		roomCount: Int
		restRoomCount: Int
		wifiName: String
		wifiPwd: String
		spaceRules: [Int]
		isRecommended: Boolean
	}

	input SpaceUpdateDetailsInput {
		guestAccesses: [Int]
		specialFeatures: [Int]
		otherGuestAccesses: String
		amenities: [Int]
		services: [Int]
		otherServices: String
		spaceStyles: [Int]
	}

	input SpaceUpdatePhotosInput {
		spacePhotos: [Upload]
	}

	input SpaceUpdateVideoInput {
		spaceVideo: String
	}

	input SpaceUpdateBookingInput {
		bookingType: String
		cancellationPolicy: String
	}

	input SpaceUpdateAvailabilityInput {
		sunday: SpaceDayAvailabilityInput
		monday: SpaceDayAvailabilityInput
		tuesday: SpaceDayAvailabilityInput
		wednesday: SpaceDayAvailabilityInput
		thursday: SpaceDayAvailabilityInput
		friday: SpaceDayAvailabilityInput
		saturday: SpaceDayAvailabilityInput
	}

	input SpaceDayAvailabilityInput {
		openStatus: Boolean
		openTime: String
		closeTime: String
	}

	input SpaceUpdateActivityInput {
		activity: [SpaceActivityInput]
	}

	input SpaceActivityInput {
		type: Int
		status: Boolean
		currencyCode: String
		minHours: Int
		maxHours: Int
		maxGuest: Int
		pricePerHour: Float
		cleaningFee: Float
		securityFee: Float
		stayDiscount: [ActivityDiscountInput]
		earlyDiscount: [ActivityDiscountInput]
	}

	input ActivityDiscountInput {
		period: String
		percentage: String
	}
	input SpaceUpdateStatusInput {
		status: String
		adminStatus: String
		resubmitReason: String
	}

	input PriceCalculationInput {
		spaceId: Int
		activityType: Int
		guest: Int
		reservationId: Int
		specialOfferId: Int
		selectedData: [SelectedDataInput]
	}
	input SelectedDataInput {
		date: String
		startTime: String
		endTime: String
	}

	input CreateSpaceInput {
		userId: Int
		userName: String
		name: JSON
		description: JSON
		maxSpace: Int
		spaceType: Int
		spaceTypeName: JSON
		roomCount: Int
		restRoomCount: Int
		wifiName: String
		wifiPwd: String
		starRating: Int
		contactEmail: String
		contactNumber: String
		noticeDays: Int
		refundDays: Int
		refundPercentage: Int
		spacePolicy: JSON
		amenities: [Int]
		spaceRules: [Int]
		guestAccesses: [Int]
		services: [Int]
		otherServices: String
		spaceAddress: SpaceUpdateLocationInput
		spacePhotos: [Upload]
		spaceVideo: String
		spaceStyles: [Int]
		activity: [SpaceActivityInput]
		availability: SpaceUpdateAvailabilityInput
		BookingType: String
		cancellationPolicy: String
		isRecommended: Boolean
		status: String
		adminStatus: String
		resubmitReason: String
		adminCommission: Int
		rating: Int
		totalRating: Int
	}

	type SpaceSearchResult {
		current_page: Int
		data: [SpaceSearchItem]
		from: Int
		to: Int
		per_page: Int
		last_page: Int
		total: Int
	}
	type SpaceSearchItem {
		id: Int
		userId: Int
		name: String
		description: String
		guests: Int
		bookingType: String
		rooms: Int
		maxSpace: Int
		spaceTypeName: String
		starRating: Float
		amenities: [Amenity]
		spaceAddress: SpaceAddress
		spacePhotos: [SpacePhoto]
		rating: Float
		totalRating: Float
		createdAt: Date
		updatedAt: Date
		currencyCode: String
		currencySymbol: String
		amount: String
		priceText: String
		isSaved: Boolean
	}
`;

export default spaceTypes;
