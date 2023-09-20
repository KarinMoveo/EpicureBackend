import { dish } from "../mockData/data/types";
import Dish from "../models/Dish";

export async function getAllDishes() {
	try {
		const allDishes = await Dish.find();
		return allDishes;
	} catch (e) {
		throw Error("Error while getting all dishes");
	}
}

export async function getSignatureDishes() {
	try {
		const allDishes = await getAllDishes();
		const signatureDishes = allDishes.slice(0,3);
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
		const updatedDish = await existingDish.save();
		return updatedDish;
	} catch (error) {
		throw new Error("Error while updating dish by id");
	}
}


export async function deleteDishByID(id: string) {
	try {
		Dish.findByIdAndDelete(id);
	} catch (e) {
		throw Error("Error while deleting dish");
	}
}
