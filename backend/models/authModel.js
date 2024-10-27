const mongoose = require("mongoose");

//user model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate usernames
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate emails
    },
    password: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    userNo: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
       default : 50,
    }
}, { timestamps: true });

module.exports =  mongoose.model('User', userSchema, 'users');



