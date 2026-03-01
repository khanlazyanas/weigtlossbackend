import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    interest: { type: String, required: true },
    message: { type: String },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);