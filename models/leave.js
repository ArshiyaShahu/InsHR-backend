const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    employee_id: {
        type: Number,
        required: true
    },
    company_id: {
        type: String,
        required: true
    },
    leave_type: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    no_days: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    request_date: {
        type: Date,
        default: Date.now
    },
    half_day: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    }
});

module.exports = mongoose.model('Leave', leaveSchema);
