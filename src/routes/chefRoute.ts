import { Router } from 'express';
import { getAllChefsController } from '../controllers/chefController'; 

const router = Router();

router.get('/', getAllChefsController); 

export default router;
