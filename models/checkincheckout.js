const mongoose = require('mongoose');

const CheckInCheckOutSchema = new mongoose.Schema({
    company_id: {
        type: String,
        required: true
    },
    employee_id: {
        type: Number,
        required: true
    },
    checkin_time: {
        type: Date,
        required: true
    },
    checkout_time: {
        type: Date,
        required: true
    },
    location: {
        type: String
    },
    remark: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('CheckInCheckOut', CheckInCheckOutSchema);
