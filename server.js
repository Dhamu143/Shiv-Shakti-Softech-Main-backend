const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Middleware
const allowedOrigins = [
    'http://localhost:3000',
    'https://shivshaktisoftech-five.vercel.app'
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST'],
        credentials: true,
    })
);

// 🔴 YOU FORGOT THIS
app.use(express.json());
// Nodemailer Transporter\\\\


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Routes
app.get('/', (req, res) => {
    res.send('Shiv Shakti Softech Backend API is running...');
});

app.post('/api/contact', async (req, res) => {
    try {
        const { fullName, email, phone, company, service, message } = req.body;

        if (!fullName || !email || !phone || !service || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "dharmeshkashyap143@gmail.com",
            replyTo: email,
            subject: `New Website Lead: ${service} - ${fullName}`,
            html: `
                <!DOCTYPE html>
                <html>
                <body style="background-color: #f4f7f6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px 0; margin: 0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); max-width: 100%;">
                        <tr>
                            <td style="background-color: #1e3a8a; padding: 30px 40px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px;">New Contact Lead</h1>
                                <p style="color: #bfdbfe; margin: 8px 0 0 0; font-size: 14px;">Shiv Shakti Softech</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 40px;">
                                <h2 style="margin: 0 0 20px 0; color: #334155; font-size: 18px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Client Details</h2>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 15px; color: #475569; line-height: 1.6;">
                                    <tr>
                                        <td width="35%" style="padding: 8px 0; font-weight: 600; color: #1e293b;">Full Name:</td>
                                        <td style="padding: 8px 0;">${fullName}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-weight: 600; color: #1e293b;">Email Address:</td>
                                        <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-weight: 600; color: #1e293b;">Phone Number:</td>
                                        <td style="padding: 8px 0;">${phone}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-weight: 600; color: #1e293b;">Company/Brand:</td>
                                        <td style="padding: 8px 0;">${company || '<span style="color: #94a3b8; font-style: italic;">Not provided</span>'}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-weight: 600; color: #1e293b;">Service Required:</td>
                                        <td style="padding: 8px 0;"><span style="background-color: #eff6ff; color: #1d4ed8; padding: 4px 10px; border-radius: 4px; font-weight: 600; font-size: 14px;">${service}</span></td>
                                    </tr>
                                </table>

                                <h2 style="margin: 30px 0 15px 0; color: #334155; font-size: 18px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Message</h2>
                                <div style="background-color: #f8fafc; border-left: 4px solid #1e3a8a; padding: 20px; border-radius: 0 8px 8px 0; color: #334155; line-height: 1.7; white-space: pre-wrap;">${message}</div>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 13px;">
                                This email was sent securely from your website's contact form.
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Email send error:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
