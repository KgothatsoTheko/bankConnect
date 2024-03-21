const mongoose = require('mongoose');

const Feedback = new mongoose.Schema({
    message: { type: String, required: true },
})

module.exports = mongoose.model('feedback', Feedback);