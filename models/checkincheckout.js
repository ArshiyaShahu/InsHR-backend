const mongoose = require('mongoose');
const { Schema } = mongoose;

const checkincheckoutschema = new Schema({
    company_id: {
        type: String,
        required: true
    },
    employee_id: {
        type: String,
        required: true
    },
    employee_name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    checkin_time: {
        type: String,
        required: true
    },
    checkout_time: {
        type: String
    },
    checkin_latitudes: {
        type: String,
        required: true
    },
    checkin_longitudes: {
        type: String,
        required: true
    },
    checkout_latitudes: {
        type: String
    },
    checkout_longitudes: {
        type: String
    },
    break_in: {  
        type: String
    },
    break_out: {
        type: String
    },
    late: {
        type: String,
        enum: ["Yes", "No"],
        default: "No"
    },
    Production_hours: {
        type: String
    },
    break_time: { 
        type: String,
        default: "Not Available"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("checkincheckout", checkincheckoutschema);
