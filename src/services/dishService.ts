import dishesMockData from "../mockData/data/dishes";
import { dish } from "../mockData/data/types";

export async function getAllDishes() {
	try {
		const allDishes = dishesMockData;
		return allDishes;
	} catch (e) {
		console.log(e);
		throw Error("Error while getting all dishes");
	}
}

export async function addDish(dish: dish) {
	try {
		return dish;
	} catch (e) {
		console.log(e);
		throw Error("Error while adding dish");
	}
}

export async function updateDishByID(id: number, dish: dish) {
	try {
		return dish;
	} catch (e) {
		console.log(e);
		throw Error("Error while update dish");
	}
}

export async function deleteDishByID(id: number) {
	try {
		return id;
	} catch (e) {
		console.log(e);
		throw Error("Error while deleting dish");
	}
}
