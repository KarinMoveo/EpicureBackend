import { Router } from "express";
import {
	addDishController,
	deleteDishController,
	getAllDishesController,
	getSignatureDishesController,
	updateDishController,
} from "../controllers/dishController";

const router = Router();

router.get("/", getAllDishesController);
router.get("/signatureDishes", getSignatureDishesController);
router.delete("/deleteDish/:id", deleteDishController);
router.post("/addDish", addDishController);
router.put("/updateDish/:id", updateDishController);

export default router;
