const mongoose = require('mongoose');

const Airtime = new mongoose.Schema({
    provider: { type: String, required: true },
    number: { type: Number, required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
})

module.exports = mongoose.model('airtime', Airtime);