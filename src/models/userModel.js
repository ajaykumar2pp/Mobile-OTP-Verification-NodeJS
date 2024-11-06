const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({

    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
    },
    otp: {
        type: String,
        required: true
    },
    otpExpires: Date,

}, { timestamps: true });




module.exports = mongoose.model('User', userSchema);