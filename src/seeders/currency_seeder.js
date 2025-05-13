import Currency from '../data/models/currency.js';

const data = [
    {id: 1,name: "US Dollar",code: "USD",symbol: "$",rate: "1.000"},
    {id: 2,name: "Australian Dollar",code: "AUD",symbol: "A$",rate: "1.575"},
    {id: 3,name: "Brazilian Real",code: "BRL",symbol: "R$",rate: "5.107"},
    {id: 4,name: "Canadian Dollar",code: "CAD",symbol: "C$",rate: "1.395"},
    {id: 5,name: "Danish Krone",code: "DKK",symbol: "kr",rate: "6.827"},
    {id: 6,name: "Europe",code: "EUR",symbol: "&#x20AC;",rate: "0.914"},
    {id: 7,name: "Hong Kong Dollar",code: "HKD",symbol: "HK$",rate: "7.753"},
    {id: 8,name: "India",code: "INR",symbol: "&#x20B9;",rate: "76.177"},
    {id: 9,name: "Israeli New Sheqel",code: "ILS",symbol: "&#x20AA;",rate: "3.578"},
    {id: 10,name: "Japanese Yen",code: "JPY",symbol: "&#xA5;",rate: "108.364"},
    {id: 11,name: "South Korean Won",code: "KRW",symbol: "&#8361;",rate: "1182.69"},
    {id: 12,name: "Malaysian Ringgit",code: "MYR",symbol: "RM",rate: "4.310"},
    {id: 13,name: "Mexican Peso",code: "MXN",symbol: "Mex$",rate: "23.352"},
    {id: 14,name: "New Taiwan Dollar",code: "TWD",symbol: "NT$",rate: "30.041"},
    {id: 15,name: "Philippine Peso",code: "PHP",symbol: "&#x20B1;",rate: "50.640"},
    {id: 16,name: "Polish Zloty",code: "PLN",symbol: "z&#x142;",rate: "4.163"},
    {id: 17,name: "Pound Sterling",code: "GBP",symbol: "&#xA3;",rate: "0.803"},
    {id: 18,name: "Russian Ruble",code: "RUB",symbol: "RUB",rate: "73.791"},
    {id: 19,name: "Singapore",code: "SGD",symbol: "S$",rate: "1.413"},
    {id: 20,name: "South African Rand",code: "ZAR",symbol: "R",rate: "18.058"},
    {id: 21,name: "Swedish Krona",code: "SEK",symbol: "kr",rate: "9.942"},
    {id: 22,name: "Swiss Franc",code: "CHF",symbol: "CHf",rate: "0.966"},
    {id: 23,name: "Norwegian Krone",code: "NOK",symbol: "kr",rate: "10.203"},
    {id: 24,name: "New Zealand Dollar",code: "NZD",symbol: "$",rate: "1.644"},
    {id: 25,name: "Thai Baht",code: "THB",symbol: "&#xE3F;",rate: "32.690"},
];

export default async () => {
    try {
        console.log('Running Currency Seeder');
        
        await Currency.deleteMany({});

        data.forEach(async (item) => {
            await Currency.create(item);
        });
    }
    catch (error) {
        console.error('Currency Seeding failed:', error);
    }
};