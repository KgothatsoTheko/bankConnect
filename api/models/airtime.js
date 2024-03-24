const mongoose = require('mongoose');

const Airtime = new mongoose.Schema({
    customerName: {type: String, required: false},
    provider: { type: String, required: false },
    numberOptions: { type: String, required: false },
    number: { type: Number, required: false },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: false },
})

module.exports = mongoose.model('airtime', Airtime);