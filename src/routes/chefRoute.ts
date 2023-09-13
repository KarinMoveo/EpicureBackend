import { Router } from 'express';
import { getAllChefsController, getChefOfTheWeekController } from '../controllers/chefController'; 

const router = Router();

router.get('/', getAllChefsController); 
router.get('/chefOfTheWeek', getChefOfTheWeekController); 

export default router;
