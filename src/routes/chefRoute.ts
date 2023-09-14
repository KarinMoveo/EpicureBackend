import { Router } from 'express';
import { addChefController, deleteChefController, getAllChefsController, getChefOfTheWeekController } from '../controllers/chefController'; 

const router = Router();

router.get('/', getAllChefsController); 
router.get('/chefOfTheWeek', getChefOfTheWeekController); 
router.get('/deleteChef/:id', deleteChefController); 
router.get('/addChef', addChefController); 

export default router;
