import express from 'express';
import { createLead, getLeads } from '../controllers/leadController.js';

const router = express.Router();

// 1. Public Route: Isme koi lock nahi hai, koi bhi form submit kar sakta hai
router.post('/', createLead);

// 2. Private Route: Isme humne seedha inline check laga diya hai (Ekdum short & simple)
router.get('/', (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  // Agar frontend se bheja gaya token aapke .env ke password se match nahi hota
  if (!token || token !== process.env.OWNER_SECRET_KEY) { 
    return res.status(401).json({ message: 'Unauthorized Access. Invalid Key.' });
  }
  
  next(); // Agar password match ho gaya, toh aage jaane do
}, getLeads);

export default router;