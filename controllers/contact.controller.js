const { sendContactEmail } = require('../services/email.service');

const handleContactSubmission = async (req, res) => {
    console.log("---- CONTACT API CALLED ----");
    console.log("Request body received:", req.body);

    try {
        const { fullName, email, phone, company, service, message } = req.body;

        if (!fullName || !email || !phone || !service || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        await sendContactEmail(req.body);

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Email send error:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
};

module.exports = { handleContactSubmission };