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
import { restaurant } from "../mockData/data/types";
import restaurantsMockData from "../mockData/data/restaurants";
import Restaurant from "../models/Restaurant";

export async function getAllRestaurantsController(req: Request, res: Response, next: NextFunction) {
	try {
		const allRestaurants = await getAllRestaurants();
		// const filteredRestaurants = filterRestaurants({ ...req.query, allRestaurants });
		return res.json(allRestaurants);
	} catch (error) {
		return res.status(400).json({ status: 400, message: "Oh oh!" });
	}
}

export async function getPopularRestaurantsController(req: Request, res: Response, next: NextFunction) {
	try {
		const popularRestaurants = await getPopularRestaurants();
		return res.json(popularRestaurants);
	} catch (error) {
		return res.status(400).json({ status: 400, message: "Oh oh!" });
	}
}

export async function getRestaurantByNameController(req: Request, res: Response, next: NextFunction) {
	const { name } = req.params;

	try {
		const restaurant = await getRestaurantByName(name);
		return res.json(restaurant);
	} catch (error) {
		return res.status(500).json({ status: 500, message: "Internal server error" });
	}
}

export async function deleteRestaurantController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		await deleteRestaurantByID(id);
		return res.status(200).json({ message: "Restaurant deleted successfully." });
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
		await updateRestaurantByID(id, restaurantsMockData[0]);
		return res.status(200).json({ message: "Restaurant updated successfully." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
}
