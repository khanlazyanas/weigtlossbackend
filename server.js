// server.js (Updated for High-Security Photo Uploads)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken'; // Import jwt for token generation
import connectDB from './config/db.js';
import bookingRoutes from './routes/bookingroutes.js';
import transformationRoutes from './routes/transformationRoutes.js';
import leadRoutes from './routes/leadRoutes.js';

dotenv.config();
connectDB();

const app = express();

// --- Setup Middleware ---
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['POST', 'GET', 'OPTIONS'], // OPTIONS added for preflight requests
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow Authorization header
}));
app.use(express.json()); 

// --- Register Custom API Routes ---
app.use('/api/bookings', bookingRoutes);
app.use('/api/leads', leadRoutes);

// === Secure Admin Verification Route ===
// Frontend Gatekeeper modal will send the password to this route
app.post('/api/verify-owner', (req, res) => {
  const { secretKey } = req.body;

  // Check if provided key matches the one in backend .env
  if (secretKey === process.env.OWNER_SECRET_KEY) {
    // Correct Password! Generate a JWT Token valid for 2 hours
    // FIXED: Now using OWNER_SECRET_KEY to sign the token to match leadRoutes.js
    const token = jwt.sign({ role: 'owner' }, process.env.OWNER_SECRET_KEY, { expiresIn: '2h' });
    
    // Send token back to frontend to be saved in localStorage
    res.status(200).json({ success: true, token });
  } else {
    // Incorrect Password
    res.status(401).json({ success: false, message: 'Invalid Secret Key. Access Denied.' });
  }
});

// Transformation (Photo Upload) System
// (Note: Security middleware will be applied inside transformationRoutes.js)
app.use('/api/transformations', transformationRoutes);

// --- Define Port & Start Listening ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Professional System Live on Port ${PORT}`));