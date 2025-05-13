import LoginSlider from '../data/models/login_slider.js';
import Slider from '../data/models/slider.js';

const loginSliderData = [
    {id: 1, image: {src: "admin_slider_1.jpg"},orderId: 1},
    {id: 2, image: {src: "admin_slider_2.jpg"},orderId: 2},
    {id: 3, image: {src: "admin_slider_3.jpg"},orderId: 3},
];

const sliderData = [
    {id: 1, title: {en:"Acropolis of Athens, Greece"}, image: {src:"slider_1.jpg"},orderId: 1},
    {id: 2, title: {en:"Machu Picchu, Peru"}, image: {src:"slider_2.jpg"},orderId: 2},
    {id: 3, title: {en:"Great Barrier Reef, Australia"}, image: {src:"slider_3.jpg"},orderId: 3},
    {id: 4, title: {en:"Rio de janeiro, Brazil"}, image: {src:"slider_4.jpg"},orderId: 4},    
];

export default async () => {
    try {
        console.log('Running Slider Seeder');
        
        await LoginSlider.deleteMany({});

        loginSliderData.forEach(async (item) => {
            await LoginSlider.create(item);
        });
        
        await Slider.deleteMany({});

        sliderData.forEach(async (item) => {
            await Slider.create(item);
        });
    }
    catch (error) {
        console.error('Slider Seeding failed:', error);
    }
};