const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Send OTP Page GET Route
router.get('/sendOtp', userController.sendOtpPage);

// Verify OTP Page GET Route
router.get('/verifyOtp', userController.verifyOtpPage);

module.exports = router;