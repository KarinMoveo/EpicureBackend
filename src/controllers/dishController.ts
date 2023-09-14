import { Request, Response, NextFunction } from "express";
import { getAllDishes } from "../services/dishService";
import { filterDishes } from "../utils";

export async function getAllDishesController(req: Request, res: Response, next: NextFunction) {
	try {
		const allDishes = await getAllDishes();
		const filteredDishes = filterDishes({ ...req.query, allDishes });
		return res.status(200).json({ status: 200, message: "Success", data: filteredDishes });
	} catch (error) {
		return res
			.status(500)
			.json({
				status: 500,
				message: "Internal Server Error",
				error: "Oh oh! Something went wrong while fetching all dishes.",
			});
	} finally {
		return res.status(400).json({ status: 400, message: "Bad Request", error: "Invalid request parameters." });
	}
}

export async function getSignatureDishesController(req: Request, res: Response, next: NextFunction) {
	try {
		const allDishes = await getAllDishes();
		const signatureDishes = allDishes.slice(0, 3);
		return res.status(200).json({ status: 200, message: "Success", data: signatureDishes });
	} catch (error) {
		return res
			.status(500)
			.json({ status: 500, message: "Internal Server Error", error: "Oh oh! Unable to fetch signature dishes." });
	} finally {
		return res.status(400).json({ status: 400, message: "Bad Request", error: "Invalid request parameters." });
	}
}
