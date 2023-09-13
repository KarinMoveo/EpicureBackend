import { Request, Response, NextFunction, response } from "express";
import { getAllChefs } from "../services/chefService";
import { filterChefs } from "../utils";
import chefsMockData from "../mockData/data/chefs";

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


export async function deleteChefController(req: Request, res: Response, next: NextFunction) {
	try {
	  const {id} = req.params;
	  const allChefs = await getAllChefs();
	  const deletedChefIndex = allChefs.findIndex((chef) => chef.id === Number(id));

	  if (deletedChefIndex === -1) {
		return res.status(404).json({ message: 'Chef not found' });
	  }
  
	  allChefs.splice(deletedChefIndex, 1)

	  return res.status(201).send();
  
	} catch (error) {
	  res.status(500).json({ message: 'Internal server error' });
	}
  }