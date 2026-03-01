import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import bookingRoutes from './routes/bookingroutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    methods: ['POST', 'GET'],         
    credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` System Live on Port ${PORT}`));