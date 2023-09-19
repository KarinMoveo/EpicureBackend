import {chef} from './types';
import restaurantsMockData from './restaurants';

const chefsMockData: chef[] = [
  {
    id: 1,
    image: "http://localhost:5000/chefs/asafGranit.png",
    name: 'Asaf Granit',
    summary: "Chef Asaf Granit has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav Udim. Granit's creativity and culinary acumen born of long experience are expressed in every detail of each and every dish.",
    popularity: 1,
    restaurants: restaurantsMockData.filter((restaurant)=>restaurant.chef === 'Asaf Granit'),
    isNew: false,
  },
  {
    id: 2,
    image: "http://localhost:5000/chefs/avivMoshe.png",
    name: 'Aviv Moshe',
    summary: "Chef Aviv Moshe has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav Udim. Moshe's creativity and culinary acumen born of long experience are expressed in every detail of each and every dish.",
    popularity: 2,
    restaurants: restaurantsMockData.filter((restaurant)=>restaurant.chef === 'Aviv Moshe'),
    isNew: true,
  },
  {
    id:3,
    image: "http://localhost:5000/chefs/eyalShani.png",
    name: 'Eyal Shani',
    summary: "Chef Eyal Shani has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav Udim. Shani's creativity and culinary acumen born of long experience are expressed in every detail of each and every dish.",
    popularity: 5,
    restaurants: restaurantsMockData.filter((restaurant)=>restaurant.chef === 'Eyal Shani'),
    isNew: false,
  },
  {
    id:4,
    image: "http://localhost:5000/chefs/meirAdoni.png",
    name: 'Meir Adoni',
    summary: "Chef Meir Adoni has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav Udim. Adoni's creativity and culinary acumen born of long experience are expressed in every detail of each and every dish.",
    popularity: 3,
    restaurants: restaurantsMockData.filter((restaurant)=>restaurant.chef === 'Meir Adoni'),
    isNew: false,
  },
  {
    id:5,
    image: "http://localhost:5000/chefs/nitzanRaz.png",
    name: 'Nitzan Raz',
    summary: "Chef Nitzan Raz has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav Udim. Raz's creativity and culinary acumen born of long experience are expressed in every detail of each and every dish.",
    popularity: 5,
    restaurants: restaurantsMockData.filter((restaurant)=>restaurant.chef === 'Nitzan Raz'),
    isNew: true,
  },
  {
    id:6,
    image: "http://localhost:5000/chefs/omerMiller.png",
    name: 'Omer Miller',
    summary: "Chef Omer Miller has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav Udim. Miller's creativity and culinary acumen born of long experience are expressed in every detail of each and every dish.",
    popularity:2,
    restaurants: restaurantsMockData.filter((restaurant)=>restaurant.chef === 'Omer Miller'),
    isNew: true,
  },
  {
    id:7,
    image: "http://localhost:5000/chefs/shahafShabtay.png",
    name: 'Shahaf Shabtay',
    summary: "Chef Shahaf Shabtay has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav Udim. Shabtay's creativity and culinary acumen born of long experience are expressed in every detail of each and every dish.",
    popularity: 4,
    restaurants: restaurantsMockData.filter((restaurant)=>restaurant.chef === 'Shahaf Shabtay'),
    isNew: false,
  },
  {
    id:8,
    image: "http://localhost:5000/chefs/yossiShitrit.png",
    name: 'Yossi Shitrit',
    summary: "Chef Yossi Shitrit has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav Udim. Shitrit's creativity and culinary acumen born of long experience are expressed in every detail of each and every dish.",
    popularity: 1,
    restaurants: restaurantsMockData.filter((restaurant)=>restaurant.chef === 'Yossi Shitrit'),
    isNew: false
  },
  {
    id:9,
    image: "http://localhost:5000/chefs/yuvalBenNeriah.png",
    name: 'Yuval Ben Neriah',
    summary: "Chef Yuval Ben Neriah has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav Udim. Ben Neriah's creativity and culinary acumen born of long experience are expressed in every detail of each and every dish.",
    popularity: 3,
    restaurants: restaurantsMockData.filter((restaurant)=>restaurant.chef === 'Yuval Ben Neriah'),
    isNew: true
  },
  
];
 export default chefsMockData;
  
  