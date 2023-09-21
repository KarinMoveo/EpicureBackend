import { Router } from 'express';
import { addChefController, deleteChefController, getAllChefsController, getChefOfTheWeekController, updateChefController } from '../controllers/chefController'; 

const router = Router();

router.get('/', getAllChefsController); 
router.get('/chefOfTheWeek', getChefOfTheWeekController); 
router.delete('/chef/:id', deleteChefController); 
router.post('/chef', addChefController);
router.put('/chef/:id', updateChefController);

export default router;
