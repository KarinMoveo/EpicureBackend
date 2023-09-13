import { Router } from 'express';
import { getAllDishesController, getSignatureDishesController } from '../controllers/dishController';

const router = Router();

router.get('/', getAllDishesController); 
router.get('/signatureDishes', getSignatureDishesController); 

export default router;
