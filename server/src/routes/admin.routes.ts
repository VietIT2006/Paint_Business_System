import { Router } from 'express';
import { getOrders, updateOrderStatus, getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/admin.controller';

const router = Router();

router.get('/orders', getOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
