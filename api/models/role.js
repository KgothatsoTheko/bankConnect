const mongoose = require('mongoose')

const Role = mongoose.Schema(
    {
        role: {
            type: String, required: true
        }
    },
)

module.exports = mongoose.model('role', Role)