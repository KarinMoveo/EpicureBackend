import { Types } from "mongoose";
import { dish } from "../shared/types";
import Dish from "../models/Dish";
import CustomError from "../shared/CustomError";
import Restaurant from "../models/Restaurant";

export async function getAllDishes() {
	const allDishes = await Dish.find().populate("restaurant");
	return allDishes;
}

export async function getSignatureDishes() {
	const allDishes = await getAllDishes();
	const signatureDishes = allDishes.slice(0, 3);
	return signatureDishes;
}

export async function addDish(newDishData: dish) {
	const newDish = new Dish(newDishData);
	const savedDish = await newDish.save();
	const restaurantId = newDishData.restaurant;
	await Restaurant.findByIdAndUpdate(restaurantId, { $push: { dishes: savedDish._id } });
	return savedDish;
}

export async function updateDishByID(id: string, updatedDishData: dish) {
	const existingDish = await Dish.findById(id);
	const { name, image, ingredients, icon, price, side, changes, mealType, restaurant } = updatedDishData;
	if (!existingDish) {
		throw new CustomError("Dish not found", 404);
	}

	existingDish.name = name;
	existingDish.image = image;
	existingDish.ingredients = ingredients;
	existingDish.icon = icon;
	existingDish.price = price;
	existingDish.side = side;
	existingDish.changes = changes;
	existingDish.mealType = mealType;
	existingDish.restaurant = new Types.ObjectId(restaurant);

	if (existingDish.restaurant.toString() !== restaurant) {
		await Restaurant.findByIdAndUpdate(existingDish.restaurant, {
			$pull: { restaurants: id },
		});
		// Update the restaurant's chef
		existingDish.restaurant = new Types.ObjectId(restaurant);
		// Add the restaurant to the new chef's restaurants array
		await Restaurant.findByIdAndUpdate(restaurant, {
			$push: { restaurants: id },
		});
	}

	const updatedDish = await existingDish.save();
	return updatedDish;
}

export async function deleteDishByID(id: string) {
	try {
		const deletedDish = await Dish.findById(id);
		if (!deletedDish) {
			throw new CustomError("Dish not found", 404);
		}

		const restaurantId = deletedDish.restaurant;

		await Dish.deleteOne({ _id: id });

		await Restaurant.findByIdAndUpdate(restaurantId, {
			$pull: { dishes: id },
		});

		return deletedDish;
	} catch (error) {
		throw new CustomError("Error while deleting dish", 500);
	}
}
