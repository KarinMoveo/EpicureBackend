import { Request, Response, NextFunction, response } from "express";
import { getAllRestaurants } from "../services/restaurantService";
import { filterRestaurants } from "../utils";
import { restaurant } from "../mockData/data/types";

export async function getAllRestaurantsController(req: Request, res: Response, next: NextFunction) {
	try {
		const allRestaurants = await getAllRestaurants();
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
			.filter((restaurant: restaurant) => restaurant.popularity >= 4)
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
