import {restaurant} from './types';
import dishesMockData from './dishes';

const restaurantsMockData : restaurant[]= [
    {
        name: 'Claro',
        chef: 'Yossi Shitrit',
        popularity: 4,
        image: "http://localhost:5000/restaurants/claro.png",
        address: "Ha-Arba'a Street, Tel Aviv-Yafo",
        from: '10:00',
        to: '22:00',
        openingDate: '01.01.2018',
        dishes: dishesMockData,
        averagePrice: 300,
        distance: 1,
        
      },
    {
        name: 'Lumina',
        chef: 'Meir Adoni',
        popularity: 3,
        image: "http://localhost:5000/restaurants/lumina.png",
        address: 'Eliezer Perry Street, Tel Aviv-Yafo',
        from: '08:00',
        to: '16:00',
        openingDate: '01.01.2021',
        dishes: dishesMockData,
        averagePrice: 100,
        distance: 2,
    },
    {
        name: 'Tiger Lilly',
        chef: 'Asaf Granit',
        popularity: 5,
        image: "http://localhost:5000/restaurants/tigerLilly.png",
        address: 'Alof Kalman Magen Street, Tel Aviv-Yafo',
        from: '10:00',
        to: '23:00',
        openingDate: '01.01.2020', 
        dishes: dishesMockData,
        averagePrice: 200,
        distance: 3,
      },
  ];
  
 export default restaurantsMockData;
  
  
  