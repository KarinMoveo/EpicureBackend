import { Request, Response, NextFunction } from "express";
import { addDish, deleteDishByID, getAllDishes, getSignatureDishes, updateDishByID } from "../services/dishService";
import { filterDishes } from "../shared/utils";

/**
 * @api {get} /api/dishes Get a list of all dishes
 * @apiName GetAllDishes
 * @apiGroup Dishes
 *
 * @apiDescription Get a list of all available dishes in the system.
 *
 * @apiSuccess {Object[]} dishes List of dishes.
 * @apiSuccess {String} dishes.name Dish name.
 * @apiSuccess {String} dishes.image Dish image URL.
 * @apiSuccess {String} dishes.ingredients Dish ingredients.
 * @apiSuccess {String} dishes.icon Dish icon URL.
 * @apiSuccess {Number} dishes.price Dish price.
 * @apiSuccess {String[]} dishes.side List of side dishes.
 * @apiSuccess {String[]} dishes.changes List of possible changes to the dish.
 * @apiSuccess {String[]} dishes.mealType List of meal types the dish is available for.
 * @apiSuccess {Object} dishes.restaurant Restaurant details where the dish is available.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "65099329e99b3290b79bbfdd",
 *         "name": "Pad Ki Mao",
 *         "image": "http://localhost:5000/dishes/padKiMao.png",
 *         "ingredients": "Shrimps, Glass, Noodles, Kemiri Nuts, Shallots, Lemon Grass, Magic, Chilli Brown Coconut",
 *         "icon": "http://localhost:5000/dishesIcons/spicy.svg",
 *         "price": 88,
 *         "side": ["White bread", "Sticky rice"],
 *         "changes": ["Without peanuts", "Sticky less spicy"],
 *         "mealType": ["Lunch", "Dinner"],
 *         "restaurant": {
 *           "_id": "650994066d51e771bec4a8f3",
 *           "name": "Claro",
 *           "image": "http://localhost:5000/restaurants/claro.png",
 *           "popularity": 4,
 *           "address": "Ha-Arba'a Street, Tel Aviv-Yafo",
 *           "from": "10:00",
 *           "to": "22:00",
 *           "openingDate": "2018-01-01",
 *           "averagePrice": 300,
 *           "distance": 1,
 *           "chef": "65098f97473bd8ecfadc3c3f"
 *         }
 *       },
 *       // More dishes...
 *     ]
 */
export async function getAllDishesController(req: Request, res: Response, next: NextFunction) {
	try {
		const restaurantsDishes = await getAllDishes();
		// const filteredDishes = filterDishes({ ...req.query, restaurantsDishes });
		return res.json(restaurantsDishes);
	} catch (error) {
		next(error);
	}
}

/**
 * @api {get} /api/dishes/signature Get a list of signature dishes
 * @apiName GetSignatureDishes
 * @apiGroup Dishes
 *
 * @apiDescription Get a list of signature dishes offered by restaurants.
 *
 * @apiSuccess {Object[]} dishes List of signature dishes.
 * @apiSuccess {String} dishes._id Unique ID of the dish.
 * @apiSuccess {String} dishes.name Dish name.
 * @apiSuccess {String} dishes.image Dish image URL.
 * @apiSuccess {String} dishes.description Dish description.
 * @apiSuccess {Number} dishes.price Dish price.
 * @apiSuccess {String[]} dishes.restaurant List of restaurants offering the dish.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *         "_id": "65099329e99b3290b79bbfdd",
 *         "name": "Pad Ki Mao",
 *         "image": "http://localhost:5000/dishes/padKiMao.png",
 *         "ingredients": "Shrimps, Glass, Noodles, Kemiri Nuts, Shallots, Lemon Grass, Magic, Chilli Brown Coconut",
 *         "icon": "http://localhost:5000/dishesIcons/spicy.svg",
 *         "price": 88,
 *         "side": ["White bread", "Sticky rice"],
 *         "changes": ["Without peanuts", "Sticky less spicy"],
 *         "mealType": ["Lunch", "Dinner"],
 *         "restaurant": {
 *           "_id": "650994066d51e771bec4a8f3",
 *           "name": "Claro",
 *           "image": "http://localhost:5000/restaurants/claro.png",
 *           "popularity": 4,
 *           "address": "Ha-Arba'a Street, Tel Aviv-Yafo",
 *           "from": "10:00",
 *           "to": "22:00",
 *           "openingDate": "2018-01-01",
 *           "averagePrice": 300,
 *           "distance": 1,
 *           "chef": "65098f97473bd8ecfadc3c3f"
 *         },
 *       // More signature dishes...
 *     ]
 */
export async function getSignatureDishesController(req: Request, res: Response, next: NextFunction) {
	try {
		const signatureDishes = await getSignatureDishes();
		return res.json(signatureDishes);
	} catch (error) {
		next(error);
	}
}

/**
 * @api {delete} /api/dishes/:id Delete a dish by ID
 * @apiName DeleteDish
 * @apiGroup Dishes
 *
 * @apiDescription Delete a dish from the system by its unique ID.
 *
 * @apiParam {String} id Dish ID to be deleted.
 *
 * @apiSuccess {String} message Success message indicating that the dish was deleted successfully.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Dish deleted successfully."
 *     }
 */
export async function deleteDishController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		await deleteDishByID(id);
		return res.status(200).json({ message: "Dish deleted successfully." });
	} catch (error) {
		next(error);
	}
}

/**
 * @api {post} /api/dishes Add a new dish
 * @apiName AddDish
 * @apiGroup Dishes
 *
 * @apiDescription Add a new dish to the system.
 *
 * @apiBody {String} name Dish name.
 * @apiBody {String} image Dish image URL.
 * @apiBody {String} ingredients Dish ingredients.
 * @apiBody {String} icon Dish icon URL.
 * @apiBody {Number} price Dish price.
 * @apiBody {String[]} side List of side dishes.
 * @apiBody {String[]} changes List of possible changes to the dish.
 * @apiBody {String[]} mealType List of meal types the dish is available for.
 * @apiBody {String} restaurant Restaurant name where the dish is available.
 *
 * @apiSuccess {String} message Success message indicating that the dish was added successfully.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Dish added successfully."
 *     }
 */

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

/**
 * @api {put} /api/dishes/:id Update a dish by ID
 * @apiName UpdateDish
 * @apiGroup Dishes
 *
 * @apiDescription Update a dish in the system by its unique ID.
 *
 * @apiParam {String} id Dish ID to be updated.
 *
 * @apiBody {String} name Updated dish name.
 * @apiBody {String} image Updated dish image URL.
 * @apiBody {String} ingredients Updated dish ingredients.
 * @apiBody {String} icon Updated dish icon URL.
 * @apiBody {Number} price Updated dish price.
 * @apiBody {String[]} side Updated list of side dishes.
 * @apiBody {String[]} changes Updated list of possible changes to the dish.
 * @apiBody {String[]} mealType Updated list of meal types the dish is available for.
 * @apiBody {String} restaurant Updated restaurant name where the dish is available.
 *
 * @apiSuccess {String} message Success message indicating that the dish was updated successfully.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Dish updated successfully."
 *     }
 */
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
		return res.status(200).json({ message: "Dish updated successfully." });
	} catch (error) {
		next(error);
	}
}
