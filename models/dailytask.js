const mongoose = require('mongoose');

const DailyTaskSchema = new mongoose.Schema({
    company_id: {
        type: String,
        required: true
    },
    employee_id: {
        type: Number,
        required: true
    },
    task_type: {
        type: String,
        required: true
    },
    task_subject: {
        type: String,
        required: true
    },
    task_description: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('DailyTask', DailyTaskSchema);
