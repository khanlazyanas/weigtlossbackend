// server.js (Updated for Photo Uploads)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import bookingRoutes from './routes/bookingroutes.js';
// === NEW: Transformation Routes Import Karo ===
import transformationRoutes from './routes/transformationRoutes.js';

dotenv.config();
connectDB();

const app = express();

// --- Setup Middleware ---
// Humne aapka strict CORS setup waisa hi rakha hai.
// Ensure karna ki .env mein FRONTEND_URL sahi ho.
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['POST', 'GET'],
    credentials: true
}));
app.use(express.json()); // Essential for parsing JSON metadata

// --- Register Custom API Routes ---
// Aapka pehle se bana hua booking system
app.use('/api/bookings', bookingRoutes);

// === NEW: Transformation (Photo Upload) System Register Karo ===
// Ab frontend se photos upload karne ke liye yeh path use hoga:
// http://localhost:5000/api/transformations/upload
app.use('/api/transformations', transformationRoutes);

// --- Define Port & Start Listening ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Professional System Live on Port ${PORT}`));