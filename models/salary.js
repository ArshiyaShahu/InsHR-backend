const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    company_id: {
        type: String,
        required: true,
        trim: true
    },
    employee_id: {
        type: Number,
        required: true,
    },
    employee_payment_mode: {
        type: String,
        required: true,
        enum: ['Bank Transfer', 'Cash', 'UPI', 'Cheque', 'Other'],
        trim: true
    },
    request_amount: {
        type: Number,
        required: true,
    },
    reason: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Approved', 'Rejected', 'Processed'],
        default: 'Pending'
    },
    accepted_amount: {
        type: Number,
    },
    approval_message: {
        type: String,
        trim: true,
    },
    owner_payment_mode: {
        type: String,
        enum: ['Bank Transfer', 'Cash', 'UPI', 'Cheque', 'Other'],
        trim: true
    },
    owner_accepted_date: {
        type: Date,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('salary', salarySchema);
