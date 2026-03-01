import Booking from '../model/Booking.js';
import nodemailer from 'nodemailer';

export const createBooking = async (req, res) => {
    try {
        const { name, email, phone, interest, message } = req.body;

        // 1. Save to MongoDB
        const newBooking = await Booking.create({ name, email, phone, interest, message });

        // 2. Setup Nodemailer (FIXED FOR RENDER & GMAIL)
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // 465 port ke liye hamesha true hota hai
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                // Ye sabse important line hai jo Render par error aane se rokegi
                rejectUnauthorized: false 
            }
        });

        // 3. Professional Email Template
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

        // 4. Send Email
        await transporter.sendMail(mailOptions);

        res.status(201).json({ success: true, message: "Protocol Initialized & Email Sent" });
    } catch (error) {
        // Console error add kiya hai taaki Render Logs mein exact problem dikhe
        console.error("❌ Booking/Email Error: ", error); 
        res.status(500).json({ success: false, error: error.message || "Failed to send email." });
    }
};