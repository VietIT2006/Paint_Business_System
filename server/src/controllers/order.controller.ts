import { Request, Response } from 'express';
import * as orderService from '../services/order.service';

export const createNewOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    
    // Basic validation
    if (!orderData.customer_name || !orderData.customer_phone || !orderData.shipping_address) {
      return res.status(400).json({ success: false, message: 'Missing required customer info' });
    }
    
    if (!orderData.items || orderData.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const newOrder = await orderService.createOrder(orderData);
    res.status(201).json({ success: true, data: newOrder });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'Missing userId' });
    }
    const orders = await orderService.getOrdersByUser(userId);
    res.status(200).json({ success: true, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
