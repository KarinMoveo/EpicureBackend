import { Router } from 'express';
import { getAllRestaurantsController, getPopularRestaurantsController, getRestaurantByIDController } from '../controllers/restaurantController'; 

const router = Router();

router.get('/', getAllRestaurantsController); 
router.get('/popular', getPopularRestaurantsController); 
router.get('/:id', getRestaurantByIDController); 


export default router;
