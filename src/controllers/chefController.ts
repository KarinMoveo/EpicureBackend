import { Request, Response, NextFunction } from "express";
import { addChef, deleteChefByID, getAllChefs, getChefOfTheWeek, updateChefByID } from "../services/chefService";
import { filterChefs } from "../shared/utils";

/**
 * @api {get} /api/chefs Get a list of chefs
 * @apiName GetAllChefs
 * @apiGroup Chefs
 *
 * @apiDescription Get a list of chefs with optional filtering.
 *
 * @apiSuccess {Object[]} chefs List of chefs.
 * @apiSuccess {String} chefs.name Chef's name.
 * @apiSuccess {String} chefs.image Chef's image URL.
 * @apiSuccess {String} chefs.summary Chef's summary.
 * @apiSuccess {Number} chefs.popularity Chef's popularity rating.
 * @apiSuccess {Boolean} chefs.isNew Indicates if the chef is new.
 * @apiSuccess {String[]} chefs.restaurants List of restaurants associated with the chef.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "chefs": [
 *         {
 *           "name": "Chef 1",
 *           "image": "image1.jpg",
 *           "summary": "A talented chef",
 *           "popularity": 4,
 *           "isNew": false,
 *           "restaurants": ["650994066d51e771bec4a8f9"]
 *         },
 *         // More chefs...
 *       ]
 *     }
 */

export async function getAllChefsController(req: Request, res: Response, next: NextFunction) {
	try {
		const allChefs = await getAllChefs();
		const filteredChefs = filterChefs({ ...req.query, allChefs });
		return res.json(filteredChefs);
	} catch (error) {
		next(error);
	}
}

/**
 * @api {get} /api/chefs/week Get Chef of the Week
 * @apiName GetChefOfTheWeek
 * @apiGroup Chefs
 *
 * @apiDescription Get the chef of the week.
 *
 * @apiSuccess {Object} chef Chef of the week.
 * @apiSuccess {String} chef.name Chef's name.
 * @apiSuccess {String} chef.image Chef's image URL.
 * @apiSuccess {String} chef.summary Chef's summary.
 * @apiSuccess {Number} chef.popularity Chef's popularity rating.
 * @apiSuccess {Boolean} chef.isNew Indicates if the chef is new.
 * @apiSuccess {String[]} chef.restaurants List of restaurants associated with the chef.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "chef": {
 *         "name": "Chef of the Week",
 *         "image": "chef-week.jpg",
 *         "summary": "This week's featured chef",
 *         "popularity": 5,
 *         "isNew": true,
 *         "restaurants": ["350994066d51e771bec4a8f1"]
 *       }
 *     }
 */

export async function getChefOfTheWeekController(req: Request, res: Response, next: NextFunction) {
	try {
		const chefOfTheWeek = await getChefOfTheWeek();
		return res.json(chefOfTheWeek);
	} catch (error) {
		next(error);
	}
}

/**
 * @api {delete} /api/chefs/:id Delete a Chef by ID
 * @apiName DeleteChefByID
 * @apiGroup Chefs
 *
 * @apiDescription Delete a chef by their unique ID.
 *
 * @apiParam {String} id Chef's unique ID.
 *
 * @apiSuccess {String} message Success message indicating the chef was deleted successfully.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Chef deleted successfully."
 *     }
 */

export async function deleteChefController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		await deleteChefByID(id);
		return res.status(200).json({ message: "Chef deleted successfully." });
	} catch (error) {
		next(error);
	}
}

/**
 * @api {post} /api/chefs Add a new Chef
 * @apiName AddChef
 * @apiGroup Chefs
 *
 * @apiDescription Add a new chef to the system.
 *
 * @apiBody {String} name Chef's name.
 * @apiBody {String} image Chef's image URL.
 * @apiBody {String} summary Chef's summary.
 * @apiBody {Number} popularity Chef's popularity rating.
 * @apiBody {Boolean} isNew Indicates if the chef is new.
 * @apiBody {String[]} restaurants List of restaurants associated with the chef.
 *
 * @apiSuccess {String} message Success message indicating the chef was added successfully.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Chef added successfully."
 *     }

 */

export async function addChefController(req: Request, res: Response, next: NextFunction) {
	try {
		const { name, image, summary, popularity, restaurants, isNew } = req.body;
		const newChefData = {
			name,
			image,
			summary,
			popularity,
			isNew,
			restaurants,
		};
		const addedChef = await addChef(newChefData);
		return res.status(201).json({ message: "Chef added successfully." });
	} catch (error) {
		next(error);
	}
}

/**
 * @api {put} /api/chefs/:id Update a Chef by ID
 * @apiName UpdateChefByID
 * @apiGroup Chefs
 *
 * @apiDescription Update a chef's information by their unique ID.
 *
 * @apiParam {String} id Chef's unique ID.
 *
 * @apiBody {String} name Updated chef's name.
 * @apiBody {String} image Updated chef's image URL.
 * @apiBody {String} summary Updated chef's summary.
 * @apiBody {Number} popularity Updated chef's popularity rating.
 * @apiBody {Boolean} isNew Indicates if the chef is new after the update.
 * @apiBody {String[]} restaurants Updated list of restaurants associated with the chef.
 *
 * @apiSuccess {String} message Success message indicating the chef was updated successfully.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Chef updated successfully."
 *     }
 */
export async function updateChefController(req: Request, res: Response, next: NextFunction) {
	try {
		const { id } = req.params;
		const { name, image, summary, popularity, restaurants, isNew } = req.body;
		const newChefData = {
			name,
			image,
			summary,
			popularity,
			isNew,
			restaurants,
		};
		await updateChefByID(id, newChefData);
		return res.status(200).json({ message: "Chef updated successfully." });
	} catch (error) {
		next(error);
	}
}
