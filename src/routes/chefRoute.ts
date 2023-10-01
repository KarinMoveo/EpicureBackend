import { Router } from 'express';
import { addChefController, deleteChefController, getAllChefsController, getChefOfTheWeekController, updateChefController } from '../controllers/chefController'; 

const router = Router();

router.get('/', getAllChefsController); 
router.get('/chefOfTheWeek', getChefOfTheWeekController); 
router.delete('/:id', deleteChefController); 
router.post('/', addChefController);
router.put('/:id', updateChefController);

export default router;
