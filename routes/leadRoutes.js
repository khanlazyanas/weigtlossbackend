import express from 'express';
import { createLead, getLeads, deleteLead } from '../controllers/leadController.js'; // Imported deleteLead
import jwt from 'jsonwebtoken';

const router = express.Router();

// 1. Public Route: Allows frontend lead submission without authentication
router.post('/', createLead);

// === SECURITY MIDDLEWARE (Guard for private routes) ===
// We extract the token logic here so it can protect multiple routes easily
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is found
  if (!token) { 
    return res.status(401).json({ message: 'Unauthorized Access. No Token provided.' });
  }

  try {
    // Decrypting/verifying the token with your OWNER_SECRET_KEY
    const decoded = jwt.verify(token, process.env.OWNER_SECRET_KEY);
    
    // If verification passes, proceed to the requested controller
    next(); 
  } catch (error) {
    // If token is tampered or expired
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: 'Unauthorized Access. Invalid or Expired Token.' });
  }
};

// 2. Private Routes (Both protected by the 'protect' middleware)
router.get('/', protect, getLeads);
router.delete('/:id', protect, deleteLead); // NEW: Secure delete route

export default router;