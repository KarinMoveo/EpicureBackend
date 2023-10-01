import { Types } from "mongoose";
import { chef } from "../shared/types";
import Chef from "../models/Chef";
import CustomError from "../shared/CustomError";
import Restaurant from "../models/Restaurant";

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
	const restaurantIds = newChefData.restaurants;
    await Restaurant.updateMany(
      { _id: { $in: restaurantIds } },
      { $push: { chefs: savedChef._id } }
    );
	return savedChef;
}

export async function updateChefByID(id: string, updatedChefData: chef) {
	const existingChef = await Chef.findById(id);
	if (!existingChef) {
		throw new CustomError("Chef not found", 404);
	}

	const { name, image, summary, popularity, restaurants, isNew } = updatedChefData;

	existingChef.name = name;
	existingChef.image = image;
	existingChef.summary = summary;
	existingChef.popularity = popularity;
	existingChef.restaurants = restaurants.map((restaurantId: any) => new Types.ObjectId(restaurantId));
	existingChef.isNew = isNew;

	 const newRestaurantIds = restaurants.map((restaurantId: any) => new Types.ObjectId(restaurantId));

	 const restaurantsToAdd = newRestaurantIds.filter((restaurantId) => !existingChef.restaurants.includes(restaurantId));
 
	 const restaurantsToRemove = existingChef.restaurants.filter(
	   (restaurantId) => !newRestaurantIds.includes(restaurantId)
	 );
 
	 existingChef.restaurants = newRestaurantIds;
 
	 await Restaurant.updateMany(
	   { _id: { $in: restaurantsToAdd } },
	   { $push: { chefs: id } }
	 );
 
	 await Restaurant.updateMany(
	   { _id: { $in: restaurantsToRemove } },
	   { $pull: { chefs: id } }
	 );

	const updatedChef = await existingChef.save();
	return updatedChef;
}

export async function deleteChefByID(id: string) {
	const deletedChef = await Chef.findById(id);
	if (!deletedChef) {
		throw new CustomError("Chef not found", 404);
	}
	const restaurantIds = deletedChef.restaurants;
    await Chef.deleteOne({ _id: id });
    await Restaurant.updateMany(
      { _id: { $in: restaurantIds } },
      { $pull: { chefs: id } }
    );

	return deletedChef;
}
