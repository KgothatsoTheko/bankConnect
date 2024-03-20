const mongoose = require('mongoose');

const Task = new mongoose.Schema({
    taskName: { type: String, required: true },
    owner: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: false },
    startTime: { type: Number, required: false },
    endTime: { type: Number, required: false },
    taskType: { type: String, required: true },
    status: { type: String, required: true },
})

module.exports = mongoose.model('tasks', Task);