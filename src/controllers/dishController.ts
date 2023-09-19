import { Request, Response, NextFunction, response } from "express";
import { addDish, deleteDishByID, getAllDishes, updateDishByID } from "../services/dishService";
import { filterDishes } from "../utils";
import dishesMockData from "../mockData/data/dishes";

export async function getAllDishesController(req: Request, res: Response, next: NextFunction) {
	try {
		const allDishes = await getAllDishes();
		const filteredDishes = filterDishes({ ...req.query, allDishes });
		return res.json(filteredDishes);
	} catch (error) {
		return res.status(400).json({ status: 400, message: "Oh oh!" });
	}
}

export async function getSignatureDishesController(req: Request, res: Response, next: NextFunction) {
	try {
		const allDishes = await getAllDishes();
		const signatureDishes = allDishes.slice(0, 3);
		return res.json(signatureDishes);
	} catch (error) {
		return res.status(400).json({ status: 400, message: "Oh oh!" });
	}
}

export async function deleteDishController(req: Request, res: Response, next: NextFunction) {
	try {
		await deleteDishByID(0);
		return res.status(201).json({ message: "Dish deleted successfully." });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function addDishController(req: Request, res: Response, next: NextFunction) {
	try {
		const addedDish = await addDish(dishesMockData[0]);
		return res.status(201).json({ message: "Dish added successfully." });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function updateDishController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		await updateDishByID(Number(id), dishesMockData[0]);
		return res.status(201).json({ message: "Dish updated successfully." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
}
