import Booking from '../model/Booking.js';
import nodemailer from 'nodemailer';

export const createBooking = async (req, res) => {
    try {
        const { name, email, phone, interest, message } = req.body;

        // 1. Save to MongoDB (Ye perfectly kaam kar raha hai)
        const newBooking = await Booking.create({ name, email, phone, interest, message });

        // 2. Setup Nodemailer (RENDER KE LIYE FIXED CODE - PORT 587)
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // 587 ke liye false rakhte hain
            requireTLS: true, // Render ko force karega connect karne ke liye
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false 
            }
        });

        // 3. Email Template
        const mailOptions = {
            from: `"WeightLossDoc System" <${process.env.EMAIL_USER}>`,
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
                    <hr />
                    <p style="font-size: 10px; color: #999;">This is an automated clinical notification.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ success: true, message: "Protocol Initialized & Email Sent" });
    } catch (error) {
        console.error("❌ Email Error: ", error);
        res.status(500).json({ success: false, error: "Database saved, but email failed." });
    }
};