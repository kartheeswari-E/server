import Order from "../data/models/order.js";

const data = [
	{
		id: 10001,
		userId: 10001,
		hostId: 10001,
		code: "ZTI4Z9VK",
		totalQuantity: 5,
		currencyCode: "USD",
		subTotal: "84.00",
		serviceFee: "10.00",
		total: "84.00",
		transactionId: null,
		paymentCurrency: null,
		paymentMethod: null,
		status: "confirmed",
		orderItems: [
			{
				itemId: 1,
				userId: 10001,
				serviceId: "1",
				currencyCode: "USD",
				basePrice: "25.00",
				quantity: 2,
				subTotal: "50.00",
				service_fee: "0.00",
				total: "50.00",
			},
			{
				itemId: 2,
				userId: 10001,
				serviceId: "2",
				currencyCode: "USD",
				basePrice: "14.00",
				quantity: 1,
				subTotal: "14.00",
				service_fee: "0.00",
				total: "14.00",
			},
			{
				itemId: 1,
				userId: 10001,
				serviceId: "2",
				currencyCode: "USD",
				basePrice: "10.00",
				quantity: 2,
				subTotal: "20.00",
				service_fee: "0.00",
				total: "20.00",
			},
		],
		orderShedules: [
			{
				type: "pickup",
				date: "2021-10-20",
				startTime: "08:00:00",
				endTime: "09:00:00",
				address: "227 Maison Street, NY, NY, 10002",
				status: "pending",
				checkedAt: null,
			},
			{
				type: "delivery",
				date: "2021-10-21",
				startTime: "08:00:00",
				endTime: "09:00:00",
				address: "227 Maison Street, NY, NY, 10002",
				status: "pending",
				checkedAt: null,
			},
		],
	},
];

export default async () => {
	try {
		console.log("Running Order Seeder");

		await Order.deleteMany({});

		for (const item of data) {
			await Order.create(item);
		}
	} catch (error) {
		console.error("Order Seeding failed:", error);
	}
};
