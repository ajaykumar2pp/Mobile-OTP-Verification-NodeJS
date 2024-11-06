const User = require('../models/userModel')


//  send Otp Page
exports.sendOtpPage = (req, res) => {
    res.render('auth/sendOtp')
}

//  verify Otp Page
exports.verifyOtpPage = async (req, res) => {

    try {
        const user = await User.findById(req.session.userId); 

        if (user) {
            res.render('auth/verifyOtp', { user });
        } else {
            res.redirect('/send-otp');
        }
    } catch (error) {
        console.error("Error loading OTP verification page:", error);
        res.status(500).send("An error occurred.");
    }

}


// Send OTP POST
exports.sendOtp = async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        req.flash('error', 'Phone number required')
        req.flash('phone', phone)
        return res.redirect('/send-otp')
    }

    try {

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
        await user.save();

        // Store userId in session
        req.session.userId = user._id;

        req.flash('success', `OTP sent successfully to ${phone}`);
        console.log("User data : ", user)

        res.redirect('/verify-otp')
        // res.status(200).json({ message: `OTP sent successfully to ${phone}` });

    } catch (error) {
        res.status(500).json({ message: 'Failed to send OTP', error });
    }
}


// Verify OTP POST
exports.verifyOtp = async (req, res) => {
    console.log(req.body)
    const { phone, otp } = req.body;
    
    try {
        const user = await User.findOne({ phone });
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
        if (user.otpExpires < Date.now()) return res.status(400).json({ message: 'OTP expired' });

        user.otp = null;
        user.otpExpires = null;

        await user.save();

        return res.redirect('/dashboard');
        // res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Verification failed', error });
    }

}

// Dashboard 
exports.dashboardPage = (req, res) => {
    res.render('pages/dashboard')
}