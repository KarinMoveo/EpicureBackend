import { Request, Response, NextFunction } from "express";
import { addDish, deleteDishByID, getAllDishes, getSignatureDishes, updateDishByID } from "../services/dishService";
// import { filterDishes } from "../utils";

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
		next(error);
	}
}

export async function deleteDishController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		await deleteDishByID(id);
		return res.status(201).json({ message: "Dish deleted successfully." });
	} catch (error) {
		next(error);
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
		next(error);
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
		next(error);
	}
}
