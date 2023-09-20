import { Types } from "mongoose";
import { dish } from "../mockData/data/types";
import Dish from "../models/Dish";

export async function getAllDishes() {
	const allDishes = await Dish.find().exec();
	return allDishes;
}

export async function getSignatureDishes() {
	try {
		const allDishes = await getAllDishes();
		const signatureDishes = allDishes.slice(0, 3);
		return signatureDishes;
	} catch (e) {
		throw Error("Error while getting signature dishes");
	}
}

export async function addDish(newDishData: dish) {
	try {
		const newDish = new Dish(newDishData);
		const savedDish = await newDish.save();
		return savedDish;
	} catch (e) {
		throw Error("Error while adding dish");
	}
}

export async function updateDishByID(id: string, updatedDishData: dish) {
	try {
		const existingDish = await Dish.findById(id);
		if (!existingDish) {
			throw new Error("Dish not found");
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
	} catch (error) {
		throw new Error("Error while updating dish by id");
	}
}

export async function deleteDishByID(id: string) {
	try {
		const deletedDish = await Dish.findByIdAndDelete(id);
		if (!deletedDish) {
			throw Error("Dish not found");
		}
		return deletedDish;
	} catch (e) {
		throw Error("Error while deleting dish");
	}
}
