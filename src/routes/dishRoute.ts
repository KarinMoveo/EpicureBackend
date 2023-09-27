import { Router } from "express";
import {
	addDishController,
	deleteDishController,
	// getAllDishesController,
	getSignatureDishesController,
	updateDishController,
} from "../controllers/dishController";
import { isAdminMiddleware } from "../shared/isAdminMiddleware";

const router = Router();

// router.get("/", getAllDishesController);
router.get("/signatureDishes", getSignatureDishesController);

router.use(isAdminMiddleware);

router.delete("/:id", deleteDishController);
router.post("/", addDishController);
router.put("/:id", updateDishController);

export default router;
