const mongoose = require('mongoose');

const Electricity = new mongoose.Schema({
    meterNo: { type: Number, required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
})

module.exports = mongoose.model('electricity', Electricity);