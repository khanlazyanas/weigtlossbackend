// routes/transformationRoutes.js
import express from 'express';
import {
  createTransformationStory,
  getAllTransformations,
} from '../controllers/transformationController.js';
import uploadMiddleware from '../config/cloudinary.js';

// Professional Note: A proper owner authentication middleware (like JWT check)
// MUST be added to protect this upload route in production.
// For now, we connect the logic.
// import { protect, admin } from '../middleware/authMiddleware.js'; // Example

const router = express.Router();

// Public route to get stories
router.get('/', getAllTransformations);

// Protected route to upload stories (Owner Only)
// '.fields()' allows us to handle multiple specific named files
router.post(
  '/upload',
  // protect, admin, // Uncomment this line when you build your auth system
  uploadMiddleware.fields([
    { name: 'beforeImg', maxCount: 1 },
    { name: 'afterImg', maxCount: 1 },
  ]),
  createTransformationStory
);

export default router;