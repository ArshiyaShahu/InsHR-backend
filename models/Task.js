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
    },
    taskDate: {
        type: String,  // Format: yyyy-mm-dd
        required: true,
    },
    taskTime: {
        type: String,  // Format: hh:mm:ss
        required: true,
    },
}, { timestamps: true });  // Auto add createdAt & updatedAt

module.exports = mongoose.model('Task', TaskSchema);
