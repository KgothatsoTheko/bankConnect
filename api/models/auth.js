const mongoose = require('mongoose');
const Schema = require('mongoose')

const Login = new mongoose.Schema({
    email: { type: String, required: true, lowercase: true, index: { unique: true } },
    pin: {type: String, required: true},
    isAdmin: {type: Boolean, default: true},
    
})

module.exports = mongoose.model('login', Login);