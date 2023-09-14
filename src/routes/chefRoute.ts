import { Router } from 'express';
import { addChefController, deleteChefController, getAllChefsController, getChefOfTheWeekController, updateChefController } from '../controllers/chefController'; 

const router = Router();

router.get('/', getAllChefsController); 
router.get('/chefOfTheWeek', getChefOfTheWeekController); 
router.delete('/deleteChef/:id', deleteChefController); 
router.post('/addChef', addChefController);
router.put('/updateChef/:id', updateChefController);

export default router;
