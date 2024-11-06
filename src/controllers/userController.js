const User = require('../models/userModel')


//  send Otp Page
exports.sendOtpPage = (req, res) => {
    res.render('auth/sendOtp')
}

//  verifying Otp  Page
exports.verifyOtpPage = (req, res) => {
    res.render('auth/verifyOtp')
}


//  send Otp POST
exports.sendOtp = async (req, res) => {
    const { phone } = req.body;

    // if (!phone) {
    //     req.flash('error', 'Phone number required')
    //     req.flash('phone', phone)
    //     return res.redirect('/sendOtp')
    // }

    try {

        // phone number is exactly 10 digits
        // const phoneRegex = /^\d{10}$/;
        // if (!phoneRegex.test(phone)) {
        //     req.flash('error', 'Please enter a valid Mobile number');
        //     req.flash('phone', phone)
        //     return res.redirect('/sendOtp');
        // }

        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60000); // OTP expires in 10 minutes

        let user = await User.findOne({ phone });


        if (user) {
            user.otp = otp;
            user.otpExpires = otpExpires;
        } else {
            user = new User({ phone, otp, otpExpires });
        }

        //  save to database
        // await user.save();

        console.log(`OTP sent successfully to ${phone}`);
        req.flash('success', `OTP sent successfully to ${phone}`);
        res.redirect('/sendOtp');
        // res.status(200).json({ message: `OTP sent successfully to ${phone}` });

    } catch (error) {
        res.status(500).json({ message: 'Failed to send OTP', error });
    }
}