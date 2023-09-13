import { Router } from 'express';
import { getAllDishesController } from '../controllers/dishController';

const router = Router();

router.get('/', getAllDishesController); 

export default router;
