import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import supabase from './config/supabase';

// Nạp các biến môi trường từ file .env
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Để parse JSON body
app.use(express.urlencoded({ extended: true }));

// Routes cơ bản
app.get('/', (req: Request, res: Response) => {
  res.send('Paint Business API is running');
});

// Khởi động server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
