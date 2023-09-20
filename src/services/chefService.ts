import { chef } from "../mockData/data/types";
import Chef from "../models/Chef";

export async function getAllChefs() {
	try {
		const allChefs = await Chef.find();
		return allChefs;
	} catch (e) {
		throw Error("Error while getting all chefs");
	}
}

export async function getChefOfTheWeek() {
	try {
		const allChefs = await getAllChefs();
		const randomIndex = Math.floor(Math.random() * allChefs.length);
		const chefOfTheWeek = allChefs[randomIndex];
		return chefOfTheWeek;
	} catch (error: any) {
		throw Error("Error by getting the chef of the weak");
	}
}

export async function addChef(newChefData: chef) {
	try {
		const newChef = new Chef(newChefData);
		const savedChef = await newChef.save();
		return savedChef;
	} catch (e) {
		throw Error("Error while adding chef");
	}
}

export async function updateChefByID(id: string, updatedChefData: chef) {
	try {
		const existingChef = await Chef.findById(id);
		if (!existingChef) {
			throw new Error("Chef not found");
		}
		existingChef.name = updatedChefData.name;
		existingChef.image = updatedChefData.image;
		const updatedChef = await existingChef.save();
		return updatedChef;
	} catch (error) {
		throw new Error("Error while updating chef by id");
	}
}

export async function deleteChefByID(id: string) {
	try {
		Chef.findByIdAndDelete(id);
	} catch (e) {
		throw Error("Error while deleting chef by id");
	}
}
