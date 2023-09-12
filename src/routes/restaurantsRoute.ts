import { Router } from 'express';
import { getAllRestaurantsController } from '../controllers/restaurantController'; 

const router = Router();

router.get('/', getAllRestaurantsController); 

export default router;
