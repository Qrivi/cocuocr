import { Router } from 'express';
import MenuController from '../controllers/rest/MenuController';

const router = Router();

router.get('/current', MenuController.getCurrent);

export default router;
