import { Router } from 'express';
import { deleteChefController, getAllChefsController, getChefOfTheWeekController } from '../controllers/chefController'; 

const router = Router();

router.get('/', getAllChefsController); 
router.get('/chefOfTheWeek', getChefOfTheWeekController); 
router.get('/deleteChef/:id', deleteChefController); 

export default router;
