// src/graphql/resolvers/pipelineUtils.js
export const conversationAggregationPipeline = (matchQuery) => [
	{ $match: matchQuery },
	{ $unwind: "$messages" },

	{
		$lookup: {
			from: "users",
			localField: "messages.userFrom",
			foreignField: "id",
			as: "userFromDetails",
		},
	},
	{ $unwind: { path: "$userFromDetails", preserveNullAndEmptyArrays: true } },

	{
		$lookup: {
			from: "users",
			localField: "userId",
			foreignField: "id",
			as: "userDetails",
		},
	},
	{ $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } },

	{
		$lookup: {
			from: "users",
			localField: "hostId",
			foreignField: "id",
			as: "hostDetails",
		},
	},
	{ $unwind: { path: "$hostDetails", preserveNullAndEmptyArrays: true } },

	{
		$lookup: {
			from: "users",
			localField: "messages.userTo",
			foreignField: "id",
			as: "userToDetails",
		},
	},
	{ $unwind: { path: "$userToDetails", preserveNullAndEmptyArrays: true } },

	{
		$lookup: {
			from: "spaces",
			localField: "spaceId",
			foreignField: "id",
			as: "spaceDetails",
		},
	},
	{ $unwind: { path: "$spaceDetails", preserveNullAndEmptyArrays: true } },

	{
		$lookup: {
			from: "reservations",
			localField: "reservationId",
			foreignField: "id",
			as: "reservationDetails",
		},
	},
	{ $unwind: { path: "$reservationDetails", preserveNullAndEmptyArrays: true } },

	{
		$lookup: {
			from: "specialOffers",
			localField: "messages.specialOfferId",
			foreignField: "id",
			as: "specialOfferDetails",
		},
	},
	{ $unwind: { path: "$specialOfferDetails", preserveNullAndEmptyArrays: true } },

	{
		$group: {
			_id: "$_id",
			id: { $first: "$id" },
			listId: { $first: "$listId" },
			reservationId: { $first: "$reservationId" },
			userId: { $first: "$userId" },
			spaceId: { $first: "$spaceId" },
			priceTotal: { $first: "$reservationDetails.total" },
			guestRefund: { $first: "$reservationDetails.refund.amount" },
			hostPayout: { $first: "$reservationDetails.payout.amount" },
			reservationStatus: { $first: "$reservationDetails.status" },
			spaceAddress: { $first: "$spaceDetails.spaceAddress" },
			userImage: { $first: "$userDetails.image" },
			userName: { $first: "$userDetails.firstName" },
			hostId: { $first: "$hostId" },
			hostImage: { $first: "$hostDetails.image" },
			hostName: { $first: "$hostDetails.firstName" },
			userCreated: { $first: "$userDetails.createdAt" },
			hostCreated: { $first: "$hostDetails.createdAt" },
			lastMessage: { $first: "$lastMessage" },
			guestArchive: { $first: "$guestArchive" },
			hostArchive: { $first: "$hostArchive" },
			guestStar: { $first: "$guestStar" },
			hostStar: { $first: "$hostStar" },
			guestRead: { $first: "$guestRead" },
			hostRead: { $first: "$hostRead" },
			specialOfferId: { $first: "$specialOfferId" },
			guestBlocked: { $first: "$guestBlocked" },
			hostBlocked: { $first: "$hostBlocked" },
			createdAt: { $first: "$createdAt" },
			updatedAt: { $first: "$updatedAt" },
			messages: {
				$push: {
					message: "$messages.message",
					messageType: "$messages.messageType",
					read: "$messages.read",
					specialOfferId: "$messages.specialOfferId",
					specialOffer: {
						id: "$specialOfferDetails.id",
						subTotal: "$specialOfferDetails.subTotal",
						hourlyPrice: "$specialOfferDetails.hourlyPrice",
						totalHours: "$specialOfferDetails.totalHours",
						serviceFee: "$specialOfferDetails.serviceFee",
						vendorFee: "$specialOfferDetails.vendorFee",
						total: "$specialOfferDetails.total",
						status: "$specialOfferDetails.status",
					},
					createdAt: "$messages.createdAt",
					userFrom: {
						id: "$userFromDetails.id",
						name: "$userFromDetails.firstName",
						image: "$userFromDetails.image",
					},
					userTo: {
						id: "$userToDetails.id",
						name: "$userToDetails.firstName",
						image: "$userToDetails.image",
					},
				},
			},
		},
	},
];
