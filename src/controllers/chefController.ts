import { Request, Response, NextFunction } from "express";
import { getAllChefs } from "../services/chefService";
import { filterChefs } from "../utils";

export async function getAllChefsController(req: Request, res: Response, next: NextFunction) {
	try {
		const allChefs = await getAllChefs();
		const filteredChefs = filterChefs({ allChefs, ...req.query });
		return res.status(200).json({ status: 200, message: "Success", data: filteredChefs });
	} catch (error) {
		return res
			.status(500)
			.json({
				status: 500,
				message: "Internal Server Error",
				error: "Something went wrong while fetching all chefs.",
			});
	} finally {
		return res.status(400).json({ status: 400, message: "Bad Request", error: "Invalid request parameters." });
	}
}

export async function getChefOfTheWeekController(req: Request, res: Response, next: NextFunction) {
	try {
		const allChefs = await getAllChefs();
		const randomIndex = Math.floor(Math.random() * allChefs.length);
		const chefOfTheWeek = allChefs[randomIndex];
		return res.status(200).json({ status: 200, message: "Success", data: chefOfTheWeek });
	} catch (error) {
		return res
			.status(500)
			.json({ status: 500, message: "Internal Server Error", error: "Unable to fetch Chef of the Week." });
	} finally {
		return res.status(400).json({ status: 400, message: "Bad Request", error: "Invalid request parameters." });
	}
}

export async function deleteChefController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const allChefs = await getAllChefs();
		const deletedChefIndex = allChefs.findIndex((chef) => chef.id === Number(id));

		if (!deletedChefIndex) {
			return res.status(404).json({ message: "Chef not found" });
		}

		allChefs.splice(deletedChefIndex, 1);

		return res.status(201).json({ message: "Chef deleted successfully." });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function addChefController(req: Request, res: Response, next: NextFunction) {
	try {
		const { name, image } = req.query;

		if (!name || !image) {
			return res.status(400).json({ message: "Both name and image are required." });
		}

		const allChefs = await getAllChefs();
		const newChef = {
			name: name as string,
			image: image as string,
			id: allChefs.length + 1,
			summary: "",
			popularity: 0,
			restaurants: [],
			isNew: false,
		};
		allChefs.push(newChef);

		return res.status(201).json({ message: "Chef added successfully." });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function updateChefController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id, name, image } = req.query;
		const allChefs = await getAllChefs();

		if (!name || !image || !id) {
			return res.status(400).json({ message: "Both name and image are required." });
		}

		const chefToUpdateIndex = allChefs.findIndex((chef) => chef.id === Number(id));

		if (chefToUpdateIndex === -1) {
			return res.status(404).json({ message: "Chef not found." });
		}

		allChefs[chefToUpdateIndex].name = name as string;
		allChefs[chefToUpdateIndex].image = image as string;

		return res.status(201).json({ message: "Chef updated successfully." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
}
