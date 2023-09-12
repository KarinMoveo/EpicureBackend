import restaurantsMockData from "../mockData/data/restaurants";

export async function getAllRestaurants() {
    try {
        const allRestaurants = restaurantsMockData;
        return allRestaurants;
    } catch(e){
        throw Error('Error while Paginating restaurants');
    }
}



