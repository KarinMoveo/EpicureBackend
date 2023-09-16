import { Request, Response, NextFunction, response } from "express";
import {
	addRestaurant,
	deleteRestaurantByID,
	getAllRestaurants,
	updateRestaurantByID,
} from "../services/restaurantService";
import { filterRestaurants } from "../utils";
import { restaurant } from "../mockData/data/types";
import restaurantsMockData from "../mockData/data/restaurants";

export async function getAllRestaurantsController(req: Request, res: Response, next: NextFunction) {
	try {
		const allRestaurants = await getAllRestaurants();
		// if(req.query.category)
		// allRestaurants.filter((rest)=>(rest.openingDate > '2023-02-25T00:00:00.000')).filter((rest)=>(rest.popularity >2)).sort()
		const filteredRestaurants = filterRestaurants({ ...req.query, allRestaurants });
		return res.json(filteredRestaurants);
	} catch (error) {
		return res.status(400).json({ status: 400, message: "Oh oh!" });
	}
}

export async function getPopularRestaurantsController(req: Request, res: Response, next: NextFunction) {
	try {
		const allRestaurants = await getAllRestaurants();
		const popularRestaurants = allRestaurants
			.filter((restaurant: restaurant) => restaurant.popularity >= 3)
			.slice(0, 3);
		return res.json(popularRestaurants);
	} catch (error) {
		return res.status(400).json({ status: 400, message: "Oh oh!" });
	}
}

export async function getRestaurantByIDController(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;

	try {
		const allRestaurants = await getAllRestaurants();
		const restaurant = allRestaurants.find((restaurant: restaurant) => restaurant.name === id);
		return res.json(restaurant);
	} catch (error) {
		return res.status(400).json({ status: 400, message: "Oh oh!" });
	}
}

export async function deleteRestaurantController(req: Request, res: Response, next: NextFunction) {
	try {
		await deleteRestaurantByID(0);
		return res.status(201).json({ message: "Restaurant deleted successfully." });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function addRestaurantController(req: Request, res: Response, next: NextFunction) {
	try {
		const addedDish = await addRestaurant(restaurantsMockData[0]);
		return res.status(201).json({ message: "Restaurant added successfully." });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function updateRestaurantController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		await updateRestaurantByID(Number(id), restaurantsMockData[0]);
		return res.status(201).json({ message: "Restaurant updated successfully." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
}
