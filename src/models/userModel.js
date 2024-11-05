const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({

    phone: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },

}, { timestamps: true });




module.exports = mongoose.model('User', userSchema);