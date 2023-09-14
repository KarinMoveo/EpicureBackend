import { Request, Response, NextFunction } from "express";
import { getAllRestaurants } from "../services/restaurantService";
import { filterRestaurants } from "../utils";
import { restaurant } from "../mockData/data/types";

export async function getAllRestaurantsController(req: Request, res: Response, next: NextFunction) {
	try {
		const allRestaurants = await getAllRestaurants();
		const filteredRestaurants = filterRestaurants({ ...req.query, allRestaurants });
		return res.status(200).json({ status: 200, message: "Success", data: filteredRestaurants });
	} catch (error) {
		return res
			.status(500)
			.json({
				status: 500,
				message: "Internal Server Error",
				error: "Something went wrong while fetching all restaurants.",
			});
	} finally {
		return res.status(400).json({ status: 400, message: "Bad Request", error: "Invalid request parameters." });
	}
}

export async function getPopularRestaurantsController(req: Request, res: Response, next: NextFunction) {
	try {
		const allRestaurants = await getAllRestaurants();
		const popularRestaurants = allRestaurants
			.filter((restaurant: restaurant) => restaurant.popularity >= 3)
			.slice(0, 3);
		return res.status(200).json({ status: 200, message: "Success", data: popularRestaurants });
	} catch (error) {
		return res
			.status(500)
			.json({
				status: 500,
				message: "Internal Server Error",
				error: "Unable to fetch popular restaurants.",
			});
	} finally {
		return res.status(400).json({ status: 400, message: "Bad Request", error: "Invalid request parameters." });
	}
}

export async function getRestaurantByIDController(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;

	try {
		const allRestaurants = await getAllRestaurants();
		const restaurant = allRestaurants.find((restaurant: restaurant) => restaurant.name === id);
		if (restaurant) {
			return res.status(200).json({ status: 200, message: "Success", data: restaurant });
		} else {
			return res.status(400).json({ status: 400, message: "Bad Request", error: "Restaurant not found." });
		}
	} catch (error) {
		return res
			.status(500)
			.json({
				status: 500,
				message: "Internal Server Error",
				error: "Something went wrong while fetching the restaurant.",
			});
	}
}
