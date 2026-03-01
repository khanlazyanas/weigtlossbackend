import Booking from '../model/Booking.js';
import { Resend } from 'resend';

// Resend API initialize karna
const resend = new Resend(process.env.RESEND_API_KEY);

export const createBooking = async (req, res) => {
    try {
        const { name, email, phone, interest, message } = req.body;

        // 1. Save to MongoDB (Ye toh perfect chal hi raha hai)
        const newBooking = await Booking.create({ name, email, phone, interest, message });

        // 2. Send Email via Resend HTTP API (Render isko block nahi kar sakta)
        const { data, error } = await resend.emails.send({
            from: 'WeightLossDoc <onboarding@resend.dev>', // Ye testing ke liye Resend ka official sender hai
            to: process.env.OWNER_EMAIL, // Yahan apna wo email daalein jisse aapne Resend par login kiya hai
            subject: `🚨 NEW INTAKE: ${name}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                    <h2 style="color: #0f172a;">New Patient Evaluation Request</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Program:</strong> ${interest}</p>
                    <p><strong>Message:</strong> ${message || 'No message provided'}</p>
                </div>
            `
        });

        // Agar Resend API ne koi error diya
        if (error) {
            console.error("❌ Resend API Error:", error);
            return res.status(500).json({ success: false, error: "Database saved, but email API failed." });
        }

        // Agar sab successfully ho gaya
        res.status(201).json({ success: true, message: "Protocol Initialized & Email Sent" });

    } catch (error) {
        console.error("❌ Backend Error: ", error);
        res.status(500).json({ success: false, error: error.message });
    }
};