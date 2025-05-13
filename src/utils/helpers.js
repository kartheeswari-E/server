import dayjs from "dayjs";

export const getDates = (startDate, endDate, format = "YYYY-MM-DD") => {
	var dateArray = [];
	var currentDate = dayjs(startDate, format);
	var endDate = dayjs(endDate, format);
	while (currentDate <= endDate) {
		dateArray.push(dayjs(currentDate).format("YYYY-MM-DD"));
		currentDate = dayjs(currentDate).add(1, "days");
	}
	return dateArray;
};

export const getDateInFormat = function (date, format = "YYYY-MM-DD") {
	return dayjs(date).format(format);
};

export const numberFormat = function (value, range = 2) {
	if (value > 0) {
		return parseFloat(value).toFixed(range);
	}
	return "0";
};

export const getDifferenceInDays = function (date1, date2) {
	const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
	const differenceInMilliseconds = date1 - date2;
	return Math.round(differenceInMilliseconds / oneDayInMilliseconds);
};

export const formatJoiError = function (error) {
	const errorDetails = error.details.reduce((acc, detail) => {
		acc[detail.path[0]] = detail.message;
		return acc;
	}, {});
	return new Error(JSON.stringify({ error: errorDetails }));
};
