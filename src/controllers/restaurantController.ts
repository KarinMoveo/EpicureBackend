import { Request, Response, NextFunction } from "express";
import {
	addRestaurant,
	deleteRestaurantByID,
	getAllRestaurants,
	getPopularRestaurants,
	getRestaurantById,
	updateRestaurantByID,
} from "../services/restaurantService";
import { filterRestaurants } from "../shared/utils";


export async function getAllRestaurantsController(req: Request, res: Response, next: NextFunction) {
	try {
		const allRestaurants = await getAllRestaurants();
		const filteredRestaurants = filterRestaurants({ ...req.query, allRestaurants });
		return res.json(filteredRestaurants);
	} catch (error) {
		next(error);	}
}

export async function getPopularRestaurantsController(req: Request, res: Response, next: NextFunction) {
	try {
		const popularRestaurants = await getPopularRestaurants();
		return res.json(popularRestaurants);
	} catch (error) {
		next(error);	}
}

export async function getRestaurantByIdController(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;

	try {
		const restaurant = await getRestaurantById(id);
		return res.json(restaurant);
	} catch (error) {
		next(error);	}
}

export async function deleteRestaurantController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		await deleteRestaurantByID(id);
		return res.status(200).json({ message: "Restaurant deleted successfully." });
	} catch (error) {
		next(error);
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
		next(error);
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
		next(error);
	}
}
