const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Send OTP Page GET Route
router.get('/send-otp', userController.sendOtpPage);

// Verify OTP Page GET Route
router.get('/verify-otp', userController.verifyOtpPage);

// Send OTP Page POST Route
router.post('/send-otp', userController.sendOtp);

// Verify OTP Page POST Route
router.post('/verify-otp', userController.verifyOtp);

// Dashboard GET Route
router.get('/dashboard', userController.dashboardPage);

module.exports = router;