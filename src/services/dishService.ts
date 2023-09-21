import { Types } from "mongoose";
import { dish } from "../shared/types";
import Dish from "../models/Dish";
import CustomError from "../shared/CustomError";

export async function getAllDishes() {
	const allDishes = await Dish.find().exec();
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
	return savedDish;
}

export async function updateDishByID(id: string, updatedDishData: dish) {
	const existingDish = await Dish.findById(id);
	if (!existingDish) {
		throw new CustomError("Dish not found", 404);
	}
	existingDish.name = updatedDishData.name;
	existingDish.image = updatedDishData.image;
	existingDish.ingredients = updatedDishData.ingredients;
	existingDish.icon = updatedDishData.icon;
	existingDish.price = updatedDishData.price;
	existingDish.side = updatedDishData.side;
	existingDish.changes = updatedDishData.changes;
	existingDish.mealType = updatedDishData.mealType;
	existingDish.restaurant = new Types.ObjectId(updatedDishData.restaurant);

	const updatedDish = await existingDish.save();
	return updatedDish;
}

export async function deleteDishByID(id: string) {
	const deletedDish = await Dish.findByIdAndDelete(id);
	if (!deletedDish) {
		throw new CustomError("Dish not found", 404);
	}
	return deletedDish;
}
