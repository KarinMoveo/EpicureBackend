import { Request, Response, NextFunction } from "express";
import {
	addChef,
	deleteChefByID,
	getAllChefs,
	getChefOfTheWeek,
	updateChefByID,
} from "../services/chefService";
import chefsMockData from "../mockData/data/chefs";

export async function getAllChefsController(req: Request, res: Response, next: NextFunction) {
	try {
		const allChefs = await getAllChefs();
		return res.json(allChefs);
	} catch (error) {
		return res.status(400).json({ status: 400, message: "Oh oh!" });
	}
}

export async function getChefOfTheWeekController(req: Request, res: Response, next: NextFunction) {
	try {
		const chefOfTheWeek = await getChefOfTheWeek();
		return res.json(chefOfTheWeek);
	} catch (error) {
		return res.status(400).json({ status: 400, message: "Oh oh!" });
	}
}

export async function deleteChefController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		await deleteChefByID(id);
		return res.status(200).json({ message: "Chef deleted successfully." });
	} catch (error : any) {
		res.status(500).json({ message: error.message});
	}
}

export async function addChefController(req: Request, res: Response, next: NextFunction) {
	try {
		const addedChef = await addChef(chefsMockData[0]);
		return res.status(201).json({ message: "Chef added successfully." });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function updateChefController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		await updateChefByID(id, chefsMockData[0]);
		return res.status(200).json({ message: "Chef updated successfully." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
}
