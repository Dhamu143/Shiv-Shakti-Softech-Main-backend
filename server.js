require('dotenv').config();
const express = require('express');
const cors = require('cors');

const contactRoutes = require('./routes/contact.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// const allowedOrigins = [
//     'http://localhost:3000',
//     'https://shivshaktisoftech-five.vercel.app'
// ];

// app.use(
//     cors({
//         origin: function (origin, callback) {
//             if (!origin) return callback(null, true);

//             if (allowedOrigins.includes(origin)) {
//                 callback(null, true);
//             } else {
//                 callback(new Error('Not allowed by CORS'));
//             }
//         },
//         methods: ['GET', 'POST'],
//         credentials: true,
//     })
// );
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Shiv Shakti Softech Backend API is running...');
});

app.use('/api', contactRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("SMTP_PORT:", process.env.SMTP_PORT);
});