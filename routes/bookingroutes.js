import express from 'express';
// YAHAN .js LAGANA HAI 👇
import { createBooking } from '../controllers/Bookingcontroller.js'; 

const router = express.Router();

router.post('/initialize', createBooking);

export default router;