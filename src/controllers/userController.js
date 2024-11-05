//  send Otp Page
exports.sendOtpPage = (req, res) => {
    res.render('auth/sendOtp')
}

//  verifying Otp  Page
exports.verifyOtpPage = (req, res) => {
    res.render('auth/verifyOtp')
}