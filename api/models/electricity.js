const mongoose = require('mongoose');

const Electricity = new mongoose.Schema({
    customerName: {type: String, required: false},
    meterNo: { type: Number, required: false },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: false },
})

module.exports = mongoose.model('electricity', Electricity);