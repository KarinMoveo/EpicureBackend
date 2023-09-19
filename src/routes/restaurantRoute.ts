import { Router } from 'express';
import { addRestaurantController, deleteRestaurantController, getAllRestaurantsController, getPopularRestaurantsController, getRestaurantByNameController, updateRestaurantController } from '../controllers/restaurantController'; 

const router = Router();

router.get('/', getAllRestaurantsController); 
router.get('/popular', getPopularRestaurantsController); 
router.get('/:name', getRestaurantByNameController); 
router.delete('/deleteRestaurant/:id', deleteRestaurantController); 
router.post('/addRestaurant', addRestaurantController);
router.put('/updateRestaurant/:id', updateRestaurantController);



export default router;
