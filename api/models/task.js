const mongoose = require('mongoose');

const Task = new mongoose.Schema({
    taskName: { type: String, required: true },
    owner: { type: String, required: true },
    description: { type: Number, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    taskType: { type: String, required: true },
    status: { type: Number, required: true },
})

module.exports = mongoose.model('tasks', Task);