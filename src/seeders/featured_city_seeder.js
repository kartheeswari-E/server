import FeaturedCity from '../data/models/featured_city.js';

const data = [
    {id:1, cityName: "Washington D.C., DC, USA",displayName: {en:"Washington DC"},latitude: "38.9071923",longitude: "-77.0368707", placeId: "ChIJW-T2Wt7Gt4kRKl2I1CJFUsI", image: {src:"washington_dc.webp"},orderId: 1,status: false},
    {id:2, cityName: "San Francisco, CA, USA",displayName: {en:"San Francisco"},latitude: "37.7749295",longitude: "-122.4194155", placeId: "ChIJIQBpAG2ahYAR_6128GcTUEo", image: {src:"san_francisco.webp"},orderId: 2,status: true},
    {id:3, cityName: "Los Angeles, CA, USA",displayName: {en:"Los Angelos"},latitude: "48.85661400000001",longitude: "2.3522219", placeId: "2wlshiNASwI9rMlMQg8tp8upenS31V9KVNDRNQn5", image: {src:"los_angeles.jpg"},orderId: 3,status: true},
    {id:4, cityName: "London, UK",displayName: {en:"London"},latitude: "51.5073509",longitude: "-0.1277583", placeId: "ChIJdd4hrwug2EcRmSrV3Vo6llI", image: {src:"london.jpg"},orderId: 4,status: true},
    {id:5, cityName: "Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",displayName: {en:"Malaysia"},latitude: "3.139003",longitude: "101.686855", placeId: "ChIJ0-cIvSo2zDERmWzYQPUfLiM", image: {src:"kuala_lumpur.jpg"},orderId: 5,status: true},
    {id:6, cityName: "Tokyo, Japan",displayName: {en:"Tokyo"},latitude: "35.6803997",longitude: "139.7690174", placeId: "ChIJXSModoWLGGARILWiCfeu2M0", image: {src:"tokyo.jpg"},orderId: 6,status: true},
    {id:7, cityName: "İstanbul, Turkey",displayName: {en:"Istanbul"},latitude: "41.0082376",longitude: "28.9783589", placeId: "ChIJawhoAASnyhQR0LABvJj-zOE", image: {src:"istanbul.jpg"},orderId: 7,status: true},
    {id:8, cityName: "Sydney NSW, Australia",displayName: {en:"Sydney"},latitude: "-33.8688197",longitude: "151.2092955", placeId: "ChIJP3Sa8ziYEmsRUKgyFmh9AQM", image: {src:"sydney.jpg"},orderId: 8,status: true},
];

export default async () => {
    try {
        console.log('Running Featured City Seeder');
        
        await FeaturedCity.deleteMany({});

        data.forEach(async (item) => {
            await FeaturedCity.create(item);
        });
    }
    catch (error) {
        console.error('Featured City Seeding failed:', error);
    }
};