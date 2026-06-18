import express from 'express';
import { createLead, getLeads } from '../controllers/leadController.js';
import jwt from 'jsonwebtoken'; // <-- JWT Import zaroori hai

const router = express.Router();

// 1. Public Route: Isme koi lock nahi hai, koi bhi form submit kar sakta hai
router.post('/', createLead);

// 2. Private Route: JWT Verification (Fixed)
router.get('/', (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  // Agar token nahi mila
  if (!token) { 
    return res.status(401).json({ message: 'Unauthorized Access. No Token provided.' });
  }

  try {
    // Yahan hum token ko decrypt/verify kar rahe hain aapke OWNER_SECRET_KEY ke sath
    const decoded = jwt.verify(token, process.env.OWNER_SECRET_KEY);
    
    // Agar verify ho gaya, toh aage jaane do
    next(); 
  } catch (error) {
    // Agar token galat ya expire ho gaya hai
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: 'Unauthorized Access. Invalid or Expired Token.' });
  }
}, getLeads);

export default router;