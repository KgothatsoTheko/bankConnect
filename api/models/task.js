const mongoose = require('mongoose');

const Task = new mongoose.Schema({
    taskName: { type: String, required: true },
    owner: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    taskType: { type: String, required: true },
    status: { type: String, required: true },
})

module.exports = mongoose.model('tasks', Task);