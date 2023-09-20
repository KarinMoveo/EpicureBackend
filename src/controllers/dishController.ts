import { Request, Response, NextFunction } from "express";
import { addDish, deleteDishByID, getAllDishes, getSignatureDishes, updateDishByID } from "../services/dishService";
// import { filterDishes } from "../utils";
import CustomError from "../shared/CustomError";

// export async function getAllDishesController(req: Request, res: Response, next: NextFunction) {
// 	try {
// 		const restaurantsDishes = await getAllDishes();
// 		const filteredDishes = filterDishes({ ...req.query, restaurantsDishes });
// 		return res.json(filteredDishes);
// 	} catch (error : any) {
// 		return res.status(400).json({ status: 400, message: error.message });
// 	}
// }

export async function getSignatureDishesController(req: Request, res: Response, next: NextFunction) {
	try {
		const signatureDishes = await getSignatureDishes();
		return res.json(signatureDishes);
	} catch (error) {
		const err = new CustomError('Error in getting signature dishes', 404);
		next(err);
	}
}

export async function deleteDishController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		await deleteDishByID(id);
		return res.status(201).json({ message: "Dish deleted successfully." });
	} catch (error) {
		const err = new CustomError('Error in deleting dish', 404);
		next(err);
	}
}

export async function addDishController(req: Request, res: Response, next: NextFunction) {
	try {
		const {name, image, ingredients, icon, price, side, changes, mealType, restaurant} = req.body;
		const newDishData = {
            name,
            image,
            ingredients,
            icon,
            price,
            side,
			changes,
			mealType,
			restaurant,
		}
		const addedDish = await addDish(newDishData);
		return res.status(201).json({ message: "Dish added successfully." });
	} catch (error) {
		const err = new CustomError('Error in adding dish', 404);
		next(err);
	}
}

export async function updateDishController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const {name, image, ingredients, icon, price, side, changes, mealType, restaurant} = req.body;
		const newDishData = {
            name,
            image,
            ingredients,
            icon,
            price,
            side,
			changes,
			mealType,
			restaurant,
		}
		await updateDishByID(id, newDishData);
		return res.status(201).json({ message: "Dish updated successfully." });
	} catch (error) {
		const err = new CustomError('Error in updating dish', 404);
		next(err);
	}
}
