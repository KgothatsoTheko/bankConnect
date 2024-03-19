const mongoose = require('mongoose');

const Address = new mongoose.Schema({
    streetName: { type: String, required: true },
    streetNumber: { type: Number, required: true },
    city: { type: String, required: true },
    code: { type: Number, required: true }
})

const Lead = new mongoose.Schema({
    id: { type: String, required: true },
    DOB: { type: Date, required: true },
    age: { type: Number, required: true },
    citizenship: { type: String, required: true },
    gender: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, index: { unique: true } },
    // address: Address,
    contact: { type: Number, required: true },
    reference: { type: String, required: true },
    // fileId: { type: String, required: true },
})

module.exports = mongoose.model('leads', Lead);


