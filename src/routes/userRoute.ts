import { Router } from "express";
import { addUserController, loginUserController } from "../controllers/userController";

const router = Router();

router.post("/signup", addUserController);
router.post("/login", loginUserController);

export default router;
