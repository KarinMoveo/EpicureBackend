import { restaurant } from "../mockData/data/types";
import Restaurant from "../models/Restaurant";

export async function getAllRestaurants() {
	try {
		const allRestaurants = await Restaurant.find().populate("chef");
		return allRestaurants;
	} catch (e) {
		throw Error("Error while Paginating restaurants");
	}
}

export async function getPopularRestaurants() {
	try {
		  const filter = { popularity: { $gte: 3 } };
		  const popularRestaurants = await Restaurant.find(filter).populate("chef");
		  return popularRestaurants;
	} catch (e) {
		throw Error("Error while Paginating restaurants");
	}
}

export async function getRestaurantByName(restaurantName: string) {
	try {
	  const restaurant = await Restaurant.findOne({ name: restaurantName }).populate("chef");
  
	  if (!restaurant) {
		throw new Error("Restaurant not found");
	  }
  
	  return restaurant;
	} catch (error) {
	  throw new Error("Error while getting restaurant by name");
	}
  }

export async function addRestaurant(newRestaurantData: restaurant) {
	try {
		const newRestaurant = new Restaurant(newRestaurantData);
		const savedRestaurant = await newRestaurant.save();
		return savedRestaurant;
	} catch (e) {
		throw Error("Error while adding restaurant");
	}
}

export async function updateRestaurantByID(id: string, updatedRestaurantData: restaurant) {
	try {
		const existingRestaurant = await Restaurant.findById(id);
		if (!existingRestaurant) {
			throw new Error("Restaurant not found");
		}
		existingRestaurant.name = updatedRestaurantData.name;
		existingRestaurant.image = updatedRestaurantData.image;
		const updatedRestaurant = await existingRestaurant.save();
		return updatedRestaurant;
	} catch (error) {
		throw new Error("Error while updating restaurant by id");
	}
}

export async function deleteRestaurantByID(id: string) {
	try {
		Restaurant.findByIdAndDelete(id);
	} catch (e) {
		throw Error("Error while deleting restaurant");
	}
}
