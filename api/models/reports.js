const mongoose = require('mongoose');

const Report = new mongoose.Schema({
    customer: { type: String, required: true },
    contact: { type: Number, required: true },
    type: { type: String, required: true },
    dateTime: { type: Date, required: true },
    employee: { type: String, required: true },
    outcome: { type: String, required: true },
})

module.exports = mongoose.model('report', Report);