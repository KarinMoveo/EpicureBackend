import { Router } from 'express';
import { addRestaurantController, deleteRestaurantController, getAllRestaurantsController, getPopularRestaurantsController, getRestaurantByIdController, updateRestaurantController } from '../controllers/restaurantController'; 

const router = Router();

router.get('/', getAllRestaurantsController); 
router.get('/popular', getPopularRestaurantsController); 
router.get('/:id', getRestaurantByIdController); 
router.delete('/restaurant/:id', deleteRestaurantController); 
router.post('/restaurant', addRestaurantController);
router.put('/restaurant/:id', updateRestaurantController);



export default router;
