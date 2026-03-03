const express = require('express');
const router = express.Router();
const { handleContactSubmission } = require('../controllers/contact.controller');

router.post('/contact', handleContactSubmission);

module.exports = router;