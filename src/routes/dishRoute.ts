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
router.delete("/:id", deleteDishController);
router.post("/", addDishController);
router.put("/:id", updateDishController);

export default router;
