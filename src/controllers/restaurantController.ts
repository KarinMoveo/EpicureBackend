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

/**
 * @api {get} /api/restaurants Get a list of restaurants
 * @apiName GetAllRestaurants
 * @apiGroup Restaurants
 *
 * @apiDescription Get a list of restaurants with optional filtering.
 *
 *
 * @apiSuccess {Object[]} restaurants List of restaurants.
 * @apiSuccess {String} restaurants._id Restaurant's unique ID.
 * @apiSuccess {String} restaurants.name Restaurant's name.
 * @apiSuccess {String} restaurants.image Restaurant's image URL.
 * @apiSuccess {Number} restaurants.popularity Restaurant's popularity rating.
 * @apiSuccess {String} restaurants.address Restaurant's address.
 * @apiSuccess {String} restaurants.from Restaurant's opening time.
 * @apiSuccess {String} restaurants.to Restaurant's closing time.
 * @apiSuccess {String} restaurants.openingDate Restaurant's opening date.
 * @apiSuccess {Number} restaurants.averagePrice Restaurant's average price.
 * @apiSuccess {Number} restaurants.distance Distance to the restaurant (in miles).
 * @apiSuccess {Object} restaurants.chef Restaurant's chef information.
 * @apiSuccess {Object[]} restaurants.dishes List of dishes offered by the restaurant.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "restaurants": [
 *         {
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
 *           "chef": {
 *             "_id": "65098f97473bd8ecfadc3c3f",
 *             "name": "Yossi Shitrit",
 *             "image": "http://localhost:5000/chefs/yossiShitrit.png",
 *             "summary": "Chef Yossi Shitrit has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav Udim. Shitrit's creativity and culinary acumen born of long experience are expressed in every detail of each and every dish.",
 *             "popularity": 1,
 *             "isNew": false,
 *             "restaurants": [],
 *           },
 *           "dishes": [
 *             {
 *               "_id": "65099329e99b3290b79bbfdf",
 *               "name": "Garbanzo Frito",
 *               "image": "http://localhost:5000/dishes/garbanzoFrito.png",
 *               "ingredients": "Polenta fingers, veal cheek, magic chili cured lemon cream, yellow laksa",
 *               "icon": "http://localhost:5000/dishesIcons/spicy.svg",
 *               "price": 98,
 *               "side": [
 *                 "White bread",
 *                 "Sticky rice"
 *               ],
 *               "changes": [
 *                 "Without peanuts",
 *                 "Sticky less spicy"
 *               ],
 *               "mealType": [
 *                 "Lunch",
 *                 "Dinner"
 *               ],
 *               "restaurant": "650994066d51e771bec4a8f3",
 *             },
 *             // Additional dishes...
 *           ],
 *         },
 *         // Additional restaurants...
 *       ]
 *     }
 *
 */

export async function getAllRestaurantsController(req: Request, res: Response, next: NextFunction) {
	try {
		const allRestaurants = await getAllRestaurants();
		const filteredRestaurants = filterRestaurants({ ...req.query, allRestaurants });
		return res.json(filteredRestaurants);
	} catch (error) {
		next(error);	}
}


/**
 * @api {get} /api/restaurants/popular Get a list of popular restaurants
 * @apiName GetPopularRestaurants
 * @apiGroup Restaurants
 *
 * @apiDescription Get a list of popular restaurants based on their popularity rating.
 *
 * @apiSuccess {Object[]} popularRestaurants List of popular restaurants.
 * @apiSuccess {String} popularRestaurants._id Restaurant's unique ID.
 * @apiSuccess {String} popularRestaurants.name Restaurant's name.
 * @apiSuccess {String} popularRestaurants.image Restaurant's image URL.
 * @apiSuccess {Number} popularRestaurants.popularity Restaurant's popularity rating.
 * @apiSuccess {String} popularRestaurants.address Restaurant's address.
 * @apiSuccess {String} popularRestaurants.from Restaurant's opening time.
 * @apiSuccess {String} popularRestaurants.to Restaurant's closing time.
 * @apiSuccess {String} popularRestaurants.openingDate Restaurant's opening date.
 * @apiSuccess {Number} popularRestaurants.averagePrice Restaurant's average price.
 * @apiSuccess {Number} popularRestaurants.distance Distance to the restaurant (in miles).
 * @apiSuccess {Object} popularRestaurants.chef Restaurant's chef information.
 * @apiSuccess {String[]} popularRestaurants.dishes List of dish IDs offered by the restaurant.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "popularRestaurants": [
 *         {
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
 *           "chef": {
 *             "_id": "65098f97473bd8ecfadc3c3f",
 *             "name": "Yossi Shitrit",
 *             "image": "http://localhost:5000/chefs/yossiShitrit.png",
 *             "summary": "Chef Yossi Shitrit has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav Udim. Shitrit's creativity and culinary acumen born of long experience are expressed in every detail of each and every dish.",
 *             "popularity": 1,
 *             "isNew": false,
 *             "restaurants": [],
 *           },
 *           "dishes": [
 *             "65098f97473bd8ecfadc3c31",
 *             "65099329e99b3290b79bbfdf",
 *             "65099329e99b3290b79bbfe1"
 *           ],
 *         },
 *         // Additional popular restaurants...
 *       ]
 *     }
 */

export async function getPopularRestaurantsController(req: Request, res: Response, next: NextFunction) {
	try {
		const popularRestaurants = await getPopularRestaurants();
		return res.json(popularRestaurants);
	} catch (error) {
		next(error);	}
}

/**
 * @api {get} /api/restaurants/:id Get a restaurant by ID
 * @apiName GetRestaurantById
 * @apiGroup Restaurants
 *
 * @apiDescription Get restaurant details by providing its unique ID.
 *
 * @apiParam {String} id Unique ID of the restaurant.
 *
 * @apiSuccess {Object} restaurant Restaurant details.
 * @apiSuccess {String} restaurant._id Restaurant's unique ID.
 * @apiSuccess {String} restaurant.name Restaurant's name.
 * @apiSuccess {String} restaurant.image Restaurant's image URL.
 * @apiSuccess {Number} restaurant.popularity Restaurant's popularity rating.
 * @apiSuccess {String} restaurant.address Restaurant's address.
 * @apiSuccess {String} restaurant.from Restaurant's opening time.
 * @apiSuccess {String} restaurant.to Restaurant's closing time.
 * @apiSuccess {String} restaurant.openingDate Restaurant's opening date.
 * @apiSuccess {Number} restaurant.averagePrice Restaurant's average price.
 * @apiSuccess {Number} restaurant.distance Distance to the restaurant (in miles).
 * @apiSuccess {Object} restaurant.chef Restaurant's chef information.
 * @apiSuccess {String[]} restaurant.dishes List of dish IDs offered by the restaurant.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "650994066d51e771bec4a8f3",
 *       "name": "Claro",
 *       "image": "http://localhost:5000/restaurants/claro.png",
 *       "popularity": 4,
 *       "address": "Ha-Arba'a Street, Tel Aviv-Yafo",
 *       "from": "10:00",
 *       "to": "22:00",
 *       "openingDate": "2018-01-01",
 *       "averagePrice": 300,
 *       "distance": 1,
 *       "chef": {
 *         "_id": "65098f97473bd8ecfadc3c3f",
 *         "name": "Yossi Shitrit",
 *         "image": "http://localhost:5000/chefs/yossiShitrit.png",
 *         "summary": "Chef Yossi Shitrit has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav Udim. Shitrit's creativity and culinary acumen born of long experience are expressed in every detail of each and every dish.",
 *         "popularity": 1,
 *         "isNew": false,
 *         "restaurants": [],
 *         "__v": 0
 *       },
 *       "dishes": [
 *         "65098f97473bd8ecfadc3c31",
 *         "65099329e99b3290b79bbfdf",
 *         "65099329e99b3290b79bbfe1"
 *       ],
 *     }
 */
export async function getRestaurantByIdController(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	try {
		const restaurant = await getRestaurantById(id);
		return res.json(restaurant);
	} catch (error) {
		next(error);	}
}

/**
 * @api {delete} /api/restaurants/:id Delete a restaurant by ID
 * @apiName DeleteRestaurant
 * @apiGroup Restaurants
 *
 * @apiDescription Delete a restaurant by providing its unique ID.
 *
 * @apiParam {String} id Unique ID of the restaurant to be deleted.
 *
 * @apiSuccess {String} message Success message indicating the restaurant was deleted successfully.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Restaurant deleted successfully."
 *     }

 */
export async function deleteRestaurantController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		await deleteRestaurantByID(id);
		return res.status(200).json({ message: "Restaurant deleted successfully." });
	} catch (error) {
		next(error);
	}
}

/**
 * @api {post} /api/restaurants Add a new restaurant
 * @apiName AddRestaurant
 * @apiGroup Restaurants
 *
 * @apiDescription Add a new restaurant with the provided data.
 *
 * @apiBody {String} name Name of the restaurant.
 * @apiBody {String} image URL of the restaurant's image.
 * @apiBody {Number} popularity Popularity rating of the restaurant (e.g., 1 to 5).
 * @apiBody {String} address Address of the restaurant.
 * @apiBody {String} from Opening time of the restaurant.
 * @apiBody {String} to Closing time of the restaurant.
 * @apiBody {String} openingDate Date when the restaurant opened.
 * @apiBody {Number} averagePrice Average price range at the restaurant.
 * @apiBody {Number} distance Distance to the restaurant.
 * @apiBody {Object} chef Information about the chef of the restaurant.
 * @apiBody {Array} dishes List of dishes offered by the restaurant.
 *
 * @apiSuccess {String} message Success message indicating the restaurant was added successfully.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Restaurant added successfully."
 *     }
 */

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

/**
 * @api {put} /api/restaurants/:id Update a restaurant by ID
 * @apiName UpdateRestaurant
 * @apiGroup Restaurants
 *
 * @apiDescription Update a restaurant's information by its unique ID.
 *
 * @apiParam {String} id Unique ID of the restaurant to be updated.
 *
 * @apiBody {String} name (Optional) Updated name of the restaurant.
 * @apiBody {String} image (Optional) Updated URL of the restaurant's image.
 * @apiBody {Number} popularity (Optional) Updated popularity rating of the restaurant (e.g., 1 to 5).
 * @apiBody {String} address (Optional) Updated address of the restaurant.
 * @apiBody {String} from (Optional) Updated opening time of the restaurant.
 * @apiBody {String} to (Optional) Updated closing time of the restaurant.
 * @apiBody {String} openingDate (Optional) Updated date when the restaurant opened.
 * @apiBody {Number} averagePrice (Optional) Updated average price range at the restaurant.
 * @apiBody {Number} distance (Optional) Updated distance to the restaurant.
 * @apiBody {Object} chef (Optional) Updated information about the chef of the restaurant.
 * @apiBody {Array} dishes (Optional) Updated list of dishes offered by the restaurant.
 *
 * @apiSuccess {String} message Success message indicating the restaurant was updated successfully.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Restaurant updated successfully."
 *     }
 */

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
