import { Router } from "express";
import {
	addRestaurantController,
	deleteRestaurantController,
	getAllRestaurantsController,
	getPopularRestaurantsController,
	getRestaurantByIdController,
	updateRestaurantController,
} from "../controllers/restaurantController";
import { isAdminMiddleware } from "../shared/isAdminMiddleware";

const router = Router();

router.get("/", getAllRestaurantsController);
router.get("/popular", getPopularRestaurantsController);
router.get("/:id", getRestaurantByIdController);

router.use(isAdminMiddleware);

router.delete("/:id", deleteRestaurantController);
router.post("/", addRestaurantController);
router.put("/:id", updateRestaurantController);

export default router;
