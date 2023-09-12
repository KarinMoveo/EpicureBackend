import {garbanzoFrito, padKiMao, smokedPizza} from "../../../assets/dishes/index";
import {spicy, vegan, vegetarian} from '../../../assets/dishesIcons/index';
import {dish} from './types';


const dishesMockData : dish[]= [
  {
    image: padKiMao,
    name: 'Pad Ki Mao',
    ingredients: 'Shrimps, Glass, Noodles, Kemiri Nuts, Shallots, Lemon Grass, Magic, Chilli Brown Coconut',
    icon: spicy,
    price: 88,
    side: ['White bread', 'Sticky rice'],
    changes: ['Without peanuts', 'Sticky less spicy'],
    restaurant: 'Lumina',
    mealType: ['Lunch', 'Dinner']
  },
  {
    image: garbanzoFrito,
    name: 'Garbanzo Frito',
    ingredients: 'Polenta fingers, veal cheek, magic chili cured lemon cream, yellow laksa',
    icon: spicy,
    price: 98,
    side: ['White bread', 'Sticky rice'],
    changes: ['Without peanuts', 'Sticky less spicy'],
    restaurant: 'Claro',
    mealType: ['Lunch', 'Dinner']
  },
  {
    image: smokedPizza,
    name: 'Smoked Pizza',
    ingredients: 'Basil dough, cashew "butter", demi-glace, bison & radish',
    icon: vegan,
    price: 65,
    side: ['White bread', 'Sticky rice'],
    changes: ['Without peanuts', 'Sticky less spicy'],
    restaurant: 'Lumina',
    mealType: ['Breakfast', 'Lunch', 'Dinner']
  },
  
];
  
 export default dishesMockData;
  
  
  