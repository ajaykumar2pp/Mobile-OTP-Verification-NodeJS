const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Send OTP Page GET Route
router.get('/sendOtp', userController.sendOtpPage);

// Verify OTP Page GET Route
router.get('/verifyOtp', userController.verifyOtpPage);

// Verify OTP Page POST Route
router.post('/sendOtp', userController.sendOtp);

module.exports = router;