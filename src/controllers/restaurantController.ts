import { Request, Response, NextFunction, response } from 'express';
import { getAllRestaurants } from "../services/restaurantService";
import { filterRestaurants } from '../utils';

export async function getAllRestaurantsController(req: Request, res: Response, next: NextFunction) {
   try {
     const allRestaurants = await getAllRestaurants();
     const filteredRestaurants = filterRestaurants({...req.query, allRestaurants});
        return res.status(200).json({ status: 200, data: filteredRestaurants, message: "Yay! All restaurants are here" });
   } catch (error) {
        return res.status(400).json({ status: 400, message: "Oh oh!" });
   }
}
