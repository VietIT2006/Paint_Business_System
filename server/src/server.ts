import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import supabase from './config/supabase';

import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';

// Nạp các biến môi trường từ file .env
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Để parse JSON body
app.use(express.urlencoded({ extended: true }));

// Khai báo các API routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Routes cơ bản
app.get('/', (req: Request, res: Response) => {
  res.send('Paint Business API is running');
});

// Khởi động server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
