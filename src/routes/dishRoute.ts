import { Router } from "express";
import {
	addDishController,
	deleteDishController,
	// getAllDishesController,
	getSignatureDishesController,
	updateDishController,
} from "../controllers/dishController";
import { isAdmin } from "../shared/IsAdmin";

const router = Router();

// router.get("/", getAllDishesController);
router.get("/signatureDishes", getSignatureDishesController);

router.use(isAdmin);

router.delete("/:id", deleteDishController);
router.post("/", addDishController);
router.put("/:id", updateDishController);

export default router;
