import { Router } from 'express';
import { createNewOrder, getMyOrders } from '../controllers/order.controller';

const router = Router();

router.post('/', createNewOrder);
router.get('/my-orders/:userId', getMyOrders);

export default router;
