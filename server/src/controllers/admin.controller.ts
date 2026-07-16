import { Request, Response } from 'express';
import * as adminService from '../services/admin.service';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await adminService.getAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const updatedOrder = await adminService.updateOrderStatus(id, status);
    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const { data, count } = await adminService.getAllProductsAdmin(page, limit);
    const totalPages = count ? Math.ceil(count / limit) : 0;

    res.status(200).json({ 
      success: true, 
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: count
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await adminService.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await adminService.updateProduct(id, req.body);
    res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await adminService.deleteProduct(id);
    res.status(200).json({ success: true, message: 'Product deactivated' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
