import { Request, Response, NextFunction } from "express";
import {
	addChef,
	deleteChefByID,
	getAllChefs,
	getChefOfTheWeek,
	updateChefByID,
} from "../services/chefService";
import { filterChefs } from "../utils";

export async function getAllChefsController(req: Request, res: Response, next: NextFunction) {
	try {
		const allChefs = await getAllChefs();
		const filteredChefs = filterChefs({ ...req.query, allChefs });
		return res.json(filteredChefs);
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
		const {name, image, summary, popularity, restaurants, isNew} = req.body;
		const newChefData = {
            name,
            image,
            summary,
            popularity,
            isNew,
            restaurants, 
        };
		const addedChef = await addChef(newChefData);
		return res.status(201).json({ message: "Chef added successfully." });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function updateChefController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const {name, image, summary, popularity, restaurants, isNew} = req.body;
		const newChefData = {
            name,
            image,
            summary,
            popularity,
            isNew,
            restaurants, 
        };
		await updateChefByID(id, newChefData);
		return res.status(200).json({ message: "Chef updated successfully." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
}
