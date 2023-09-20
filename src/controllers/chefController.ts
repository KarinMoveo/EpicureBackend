import { Request, Response, NextFunction } from "express";
import { addChef, deleteChefByID, getAllChefs, getChefOfTheWeek, updateChefByID } from "../services/chefService";
import { filterChefs } from "../utils";
import CustomError from '../shared/CustomError';

export async function getAllChefsController(req: Request, res: Response, next: NextFunction) {
	try{
		const allChefs = await getAllChefs();
		const filteredChefs = filterChefs({ ...req.query, allChefs });
		return res.json(filteredChefs);
	}catch(error){
		const err = new CustomError('Error in getting all chefs', 404);
		next(err);
	}
}

export async function getChefOfTheWeekController(req: Request, res: Response, next: NextFunction) {
	try{
		const chefOfTheWeek = await getChefOfTheWeek();
		return res.json(chefOfTheWeek);
	}catch(error){
		const err = new CustomError('Error in getting chef of the week', 404);
		next(err);
	}
}

export async function deleteChefController(req: Request, res: Response, next: NextFunction) {
	try{
		const { id } = req.params;
		await deleteChefByID(id);
		return res.status(200).json({ message: "Chef deleted successfully." });
	}catch(error){
		const err = new CustomError('Error in deleting chef', 404);
		next(err);
	}
}

export async function addChefController(req: Request, res: Response, next: NextFunction) {
	try{
		const { name, image, summary, popularity, restaurants, isNew } = req.body;
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
	}catch(error){
		const err = new CustomError('Error in adding chef', 404);
		next(err);
	}
}

export async function updateChefController(req: Request, res: Response, next: NextFunction) {
	try{
		const { id } = req.params;
		const { name, image, summary, popularity, restaurants, isNew } = req.body;
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
	}catch(error){
		const err = new CustomError('Error in updating chef', 404);
		next(err);
	}
}
