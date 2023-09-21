import { Request, Response, NextFunction } from "express";
import {
	addRestaurant,
	deleteRestaurantByID,
	getAllRestaurants,
	getPopularRestaurants,
	getRestaurantByName,
	updateRestaurantByID,
} from "../services/restaurantService";
import { filterRestaurants } from "../utils";
import CustomError from "../shared/CustomError";


export async function getAllRestaurantsController(req: Request, res: Response, next: NextFunction) {
	try {
		const allRestaurants = await getAllRestaurants();
		const filteredRestaurants = filterRestaurants({ ...req.query, allRestaurants });
		return res.json(filteredRestaurants);
	} catch (error) {
		const err = new CustomError('Error in getting restaurants', 404);
		next(err);	}
}

export async function getPopularRestaurantsController(req: Request, res: Response, next: NextFunction) {
	try {
		const popularRestaurants = await getPopularRestaurants();
		return res.json(popularRestaurants);
	} catch (error : any) {
		const err = new CustomError('Error in getting popular restaurants', 404);
		next(err);	}
}

export async function getRestaurantByNameController(req: Request, res: Response, next: NextFunction) {
	const { name } = req.params;

	try {
		const restaurant = await getRestaurantByName(name);
		return res.json(restaurant);
	} catch (error) {
		const err = new CustomError('Error in getting restaurant', 404);
		next(err);	}
}

export async function deleteRestaurantController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		await deleteRestaurantByID(id);
		return res.status(200).json({ message: "Restaurant deleted successfully." });
	} catch (error) {
		const err = new CustomError('Error in deleting restaurant', 404);
		next(err);
	}
}

export async function addRestaurantController(req: Request, res: Response, next: NextFunction) {
	try {
		const { name, image, popularity, address, from, to, openingDate, averagePrice, distance, chef, dishes } =
			req.body;
		const newRestaurantData = {
			name,
			image,
			popularity,
			address,
			from,
			to,
			openingDate,
			averagePrice,
			distance,
			chef,
			dishes,
		};
		const addedDish = await addRestaurant(newRestaurantData);
		return res.status(201).json({ message: "Restaurant added successfully." });
	} catch (error) {
		const err = new CustomError('Error in adding restaurant', 404);
		next(err);
	}
}

export async function updateRestaurantController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const { name, image, popularity, address, from, to, openingDate, averagePrice, distance, chef, dishes } =
			req.body;
		const newRestaurantData = {
			name,
			image,
			popularity,
			address,
			from,
			to,
			openingDate,
			averagePrice,
			distance,
			chef,
			dishes,
		};
		await updateRestaurantByID(id, newRestaurantData);
		return res.status(200).json({ message: "Restaurant updated successfully." });
	} catch (error) {
		const err = new CustomError('Error in updating restaurant', 404);
		next(err);
	}
}
