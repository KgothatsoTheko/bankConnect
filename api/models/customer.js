const mongoose = require('mongoose');
const Schema = require('mongoose')

const Customer = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    id: { type: String, required: true },
    gender: { type: String, required: true },
    contact: { type: Number, required: true },
    email: { type: String, required: true, lowercase: true, index: { unique: true } },
    pin: {type: String, required: true},
    balance: {type: Number, required: false},
    // will add role
    // roles: { type: String, required: true },
    // help make security in api, false cause it is not need 
    isAdmin: {type: Boolean, default: false},
})

module.exports = mongoose.model('customer', Customer);


