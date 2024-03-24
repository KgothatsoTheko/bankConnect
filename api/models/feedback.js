const mongoose = require('mongoose');

const Feedback = new mongoose.Schema({
    customerName: {type: String, required: false},
    message: { type: String, required: true },
})

module.exports = mongoose.model('feedback', Feedback);