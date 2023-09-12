import restaurantsMockData from "../mockData/data/restaurants";

export async function getAllRestaurants() {
    try {
        const allRestaurants = restaurantsMockData;
        console.log(allRestaurants);
        return allRestaurants;
    } catch(e){
        console.log(e);
        throw Error('Error while Paginating restaurants');
    }
}



