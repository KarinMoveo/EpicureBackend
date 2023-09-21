import { Types } from "mongoose";
import { chef } from "../shared/types";
import Chef from "../models/Chef";
import CustomError from "../shared/CustomError";

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

	const { name, image, summary, popularity, restaurants, isNew } = updatedChefData;

	existingChef.name = name;
	existingChef.image = image;
	existingChef.summary = summary;
	existingChef.popularity = popularity;
	existingChef.restaurants = restaurants.map((restaurantId: any) => new Types.ObjectId(restaurantId));
	existingChef.isNew = isNew;

	const updatedChef = await existingChef.save();
	return updatedChef;
}

export async function deleteChefByID(id: string) {
	const deletedChef = await Chef.findByIdAndDelete(id);
	if (!deletedChef) {
		throw new CustomError("Chef not found", 404);
	}
	return deletedChef;
}
