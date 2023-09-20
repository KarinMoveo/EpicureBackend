import { Types } from "mongoose";
import { chef } from "../mockData/data/types";
import Chef from "../models/Chef";

export async function getAllChefs() {
	const allChefs = await Chef.find().populate("restaurants");
	return allChefs;
}

export async function getChefOfTheWeek() {
	const allChefs = await getAllChefs();
	const randomIndex = Math.floor(Math.random() * allChefs.length);
	const chefOfTheWeek = allChefs[randomIndex];
	return chefOfTheWeek;
}

export async function addChef(newChefData: chef) {
	const newChef = new Chef(newChefData);
	const savedChef = await newChef.save();
	return savedChef;
}

export async function updateChefByID(id: string, updatedChefData: chef) {
	const existingChef = await Chef.findById(id);
	if (!existingChef) {
		throw new Error("Chef not found");
	}
	existingChef.name = updatedChefData.name;
	existingChef.image = updatedChefData.image;
	existingChef.summary = updatedChefData.summary;
	existingChef.popularity = updatedChefData.popularity;
	existingChef.restaurants = updatedChefData.restaurants.map((restaurantId: any) => new Types.ObjectId(restaurantId));
	existingChef.isNew = updatedChefData.isNew;

	const updatedChef = await existingChef.save();
	return updatedChef;
}

export async function deleteChefByID(id: string) {
	const deletedChef = await Chef.findByIdAndDelete(id);
	if (!deletedChef) {
		throw Error("Chef not found");
	}
	return deletedChef;
}
