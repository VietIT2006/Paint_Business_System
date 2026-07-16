import { Router } from 'express';
import { createNewOrder } from '../controllers/order.controller';

const router = Router();

router.post('/', createNewOrder);

export default router;
