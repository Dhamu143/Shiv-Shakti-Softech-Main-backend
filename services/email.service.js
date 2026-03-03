const nodemailer = require('nodemailer');
const smtpPort = Number(process.env.SMTP_PORT) || 587;

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465, // Automatically true for 465, false for 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendContactEmail = async (clientData) => {
    const { fullName, email, phone, company, service, message } = clientData;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        // to: "dharmeshkashyap143@gmail.com",
        to: "ankurp0608@gmail.com",
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

    console.log("About to send email...");

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully! Message ID:", info.messageId);
        return info;
    } catch (error) {
        console.error("Error inside sendContactEmail service:", error);
        throw error;
    }
};

module.exports = { sendContactEmail };