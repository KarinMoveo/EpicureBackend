import {garbanzoFrito, padKiMao, smokedPizza} from "../../../assets/dishes/index";
import {spicy, vegan, vegetarian} from '../../../assets/dishesIcons/index';
import {dish} from './types';


const dishesMockData : dish[]= [
  {
    image: "http://localhost:5000/dishes/padKiMao.png",
    name: 'Pad Ki Mao',
    ingredients: 'Shrimps, Glass, Noodles, Kemiri Nuts, Shallots, Lemon Grass, Magic, Chilli Brown Coconut',
    icon: "http://localhost:5000/dishesIcons/spicy.svg",
    price: 88,
    side: ['White bread', 'Sticky rice'],
    changes: ['Without peanuts', 'Sticky less spicy'],
    restaurant: 'Lumina',
    mealType: ['Lunch', 'Dinner']
  },
  {
    image: "http://localhost:5000/dishes/garbanzoFrito.png",
    name: 'Garbanzo Frito',
    ingredients: 'Polenta fingers, veal cheek, magic chili cured lemon cream, yellow laksa',
    icon: "http://localhost:5000/dishesIcons/spicy.svg",
    price: 98,
    side: ['White bread', 'Sticky rice'],
    changes: ['Without peanuts', 'Sticky less spicy'],
    restaurant: 'Claro',
    mealType: ['Lunch', 'Dinner']
  },
  {
    image: "http://localhost:5000/dishes/smokedPizza.png",
    name: 'Smoked Pizza',
    ingredients: 'Basil dough, cashew "butter", demi-glace, bison & radish',
    icon: "http://localhost:5000/dishesIcons/vegan.svg",
    price: 65,
    side: ['White bread', 'Sticky rice'],
    changes: ['Without peanuts', 'Sticky less spicy'],
    restaurant: 'Lumina',
    mealType: ['Breakfast', 'Lunch', 'Dinner']
  },
  
];
  
 export default dishesMockData;
  
  
  