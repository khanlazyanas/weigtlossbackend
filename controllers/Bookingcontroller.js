import Booking from '../model/Booking.js';
import { Resend } from 'resend';

export const createBooking = async (req, res) => {
    try {
        // 🚀 FIX: API Key initialize yahan function ke andar karni hai
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { name, email, phone, interest, message } = req.body;

        // 1. Save to MongoDB (Bahut fast, instantly ho jayega)
        const newBooking = await Booking.create({ name, email, phone, interest, message });

        // 2. ⚡ TURANT JAWAB BHEJO (Frontend loading yahan ruk jayegi, no waiting!)
        res.status(201).json({ success: true, message: "Request received successfully!" });

        // 3. BACKGROUND PROCESS (Email bhejne ka kaam background me chalne do)
        resend.emails.send({
            from: 'WeightLossDoc <onboarding@resend.dev>', 
            to: process.env.OWNER_EMAIL, 
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
        }).then(({ data, error }) => {
            if (error) console.error("❌ Background Email Failed:", error);
            else console.log("✅ Background Email Sent:", data);
        }).catch(err => console.error("❌ Catch Email Error:", err));

    } catch (error) {
        console.error("❌ Backend Error: ", error);
        res.status(500).json({ success: false, error: "System Error. Please try again." });
    }
};