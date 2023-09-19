import restaurantsMockData from "../mockData/data/restaurants";
import { restaurant } from "../mockData/data/types";

export async function getAllRestaurants() {
	try {
		const allRestaurants = restaurantsMockData;
		return allRestaurants;
	} catch (e) {
		throw Error("Error while Paginating restaurants");
	}
}

export async function getPopularRestaurants() {
	try {
		const allRestaurants = restaurantsMockData;
		const popularRestaurants = allRestaurants
			.filter((restaurant: restaurant) => restaurant.popularity >= 3)
			.slice(0, 3);
		return popularRestaurants;
	} catch (e) {
		throw Error("Error while Paginating restaurants");
	}
}

export async function addRestaurant(restaurant: restaurant) {
	try {
		return restaurant;
	} catch (e) {
		console.log(e);
		throw Error("Error while adding restaurant");
	}
}

export async function updateRestaurantByID(id: number, restaurant: restaurant) {
	try {
		return restaurant;
	} catch (e) {
		console.log(e);
		throw Error("Error while updating restaurant");
	}
}

export async function deleteRestaurantByID(id: number) {
	try {
		return id;
	} catch (e) {
		console.log(e);
		throw Error("Error while deleting restaurant");
	}
}
