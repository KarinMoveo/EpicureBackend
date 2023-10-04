import { Types } from "mongoose";
import { dish } from "../shared/types";
import Dish from "../models/Dish";
import CustomError from "../shared/CustomError";
import Restaurant from "../models/Restaurant";

const NULL_OBJECT_ID = new Types.ObjectId("000000000000000000000000");

export async function getAllDishes() {
	const allDishes = await Dish.find().populate("restaurant");
	return allDishes;
}

export async function getSignatureDishes() {
	const allDishes = await getAllDishes();
	const signatureDishes = allDishes.slice(0, 3);
	return signatureDishes;
}

export async function addDish(newDishData: dish) {
	const newDish = new Dish(newDishData);
	const savedDish = await newDish.save();
	const restaurantId = newDishData.restaurant;
	await Restaurant.findByIdAndUpdate(restaurantId, { $push: { dishes: savedDish._id } });
	return savedDish;
}

export async function updateDishByID(id: string, updatedDishData: dish) {
	const { name, image, ingredients, icon, price, side, changes, mealType, restaurant } = updatedDishData;

	try {
		const existingDish = await Dish.findById(id);
		if (!existingDish) {
			throw new CustomError("Dish not found", 404);
		}

		if (existingDish.restaurant?.toString() !== restaurant) {
			if (existingDish.restaurant && existingDish.restaurant.toString() !== NULL_OBJECT_ID.toString()) {
				await Restaurant.findByIdAndUpdate(existingDish.restaurant, {
					$pull: { dishes: id },
				});
			}

			if (restaurant) {
				existingDish.restaurant = new Types.ObjectId(restaurant);

				await Restaurant.findByIdAndUpdate(restaurant, {
					$push: { dishes: id },
				});
			} else {
				existingDish.restaurant = NULL_OBJECT_ID;
			}
		}

		existingDish.name = name;
		existingDish.image = image;
		existingDish.ingredients = ingredients;
		existingDish.icon = icon;
		existingDish.price = price;
		existingDish.side = side;
		existingDish.changes = changes;
		existingDish.mealType = mealType;

		const updatedDish = await existingDish.save();
		return updatedDish;
	} catch (error) {
		throw new CustomError("Error updating Dish", 500);
	}
}

export async function deleteDishByID(id: string) {
	try {
		const deletedDish = await Dish.findById(id);
		if (!deletedDish) {
			throw new CustomError("Dish not found", 404);
		}

		const restaurantId = deletedDish.restaurant;

		await Dish.deleteOne({ _id: id });

		await Restaurant.findByIdAndUpdate(restaurantId, {
			$pull: { dishes: id },
		});

		console.log("Dish removed from restaurant:", id);

		return deletedDish;
	} catch (error) {
		throw new CustomError("Error while deleting dish", 500);
	}
}
