import { Router } from "express";
import {
	addDishController,
	deleteDishController,
	// getAllDishesController,
	getSignatureDishesController,
	updateDishController,
} from "../controllers/dishController";

const router = Router();

// router.get("/", getAllDishesController);
router.get("/signatureDishes", getSignatureDishesController);
router.delete("/dish/:id", deleteDishController);
router.post("/dish", addDishController);
router.put("/dish/:id", updateDishController);

export default router;
