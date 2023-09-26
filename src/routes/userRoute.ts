import { Router } from "express";
import { addUserController } from "../controllers/userController";

const router = Router();

router.post("/signup", addUserController);

export default router;
