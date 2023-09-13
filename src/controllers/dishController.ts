import { Request, Response, NextFunction, response } from "express";
import { getAllDishes } from "../services/dishService";
import { filterDishes } from "../utils";

export async function getAllDishesController(req: Request, res: Response, next: NextFunction) {
	try {
		const allDishes = await getAllDishes();
		const filteredDishes = filterDishes({ ...req.query, allDishes });
		return res.json(filteredDishes);
	} catch (error) {
		return res.status(400).json({ status: 400, message: "Oh oh!" });
	}
}