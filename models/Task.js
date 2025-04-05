const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskType: {
        type: String,
        required: true,
    },
    taskSubject: {
        type: String,
        required: true,
    },
    taskDescription: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
