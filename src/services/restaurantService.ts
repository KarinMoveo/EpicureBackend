import { Types } from "mongoose";
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
	const filter = { popularity: { $gte: 3 } };
	const popularRestaurants = await Restaurant.find(filter).populate("chef");
	return popularRestaurants;
}

export async function getRestaurantByName(restaurantName: string) {
	try {
		const restaurant = await Restaurant.findOne({ name: restaurantName }).populate("chef").populate("dishes");

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
		existingRestaurant.popularity = updatedRestaurantData.popularity;
		existingRestaurant.address = updatedRestaurantData.address;
		existingRestaurant.from = updatedRestaurantData.from;
		existingRestaurant.to = updatedRestaurantData.to;
		existingRestaurant.openingDate = updatedRestaurantData.openingDate;
		existingRestaurant.averagePrice = updatedRestaurantData.averagePrice;
		existingRestaurant.distance = updatedRestaurantData.distance;
		existingRestaurant.chef = new Types.ObjectId(updatedRestaurantData.chef);
		existingRestaurant.dishes = updatedRestaurantData.dishes.map((dishId: any) => new Types.ObjectId(dishId));

		const updatedRestaurant = await existingRestaurant.save();
		return updatedRestaurant;
	} catch (error) {
		throw new Error("Error while updating restaurant by id");
	}
}

export async function deleteRestaurantByID(id: string) {
	try {
		const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
		if (!deletedRestaurant) {
			throw Error("Restaurant not found");
		}
		return deletedRestaurant;
	} catch (e) {
		throw Error("Error while deleting restaurant");
	}
}
