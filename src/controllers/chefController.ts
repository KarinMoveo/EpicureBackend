import { Request, Response, NextFunction, response } from "express";
import { getAllChefs } from "../services/chefService";
import { filterChefs } from "../utils";

export async function getAllChefsController(req: Request, res: Response, next: NextFunction) {
	try {
		const allChefs = await getAllChefs();
		const filteredChefs = filterChefs({ allChefs, ...req.query });
		return res.json(filteredChefs);
	} catch (error) {
		return res.status(400).json({ status: 400, message: "Oh oh!" });
	}
}

export async function getChefOfTheWeekController(req: Request, res: Response, next: NextFunction) {
	try {
		const allChefs = await getAllChefs();
		const randomIndex = Math.floor(Math.random() * allChefs.length);
		const chefOfTheWeek = allChefs[randomIndex];
		return res.json(chefOfTheWeek);
	} catch (error) {
		return res.status(400).json({ status: 400, message: "Oh oh!" });
	}
}
