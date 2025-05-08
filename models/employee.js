const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
    {
        company_id: {
            type: String,
            required: true
        },
        employee_id: {
            type: String,
            required: true,
            unique: true,
        },
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        employee_address: {
            type: String,
            required: true
        },
        contact_no: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        date_of_birth: {
            type: Date,
            required: true
        },
        marital_status: {
            type: String,
            required: true
        },
        emergency_contact_name: {
            type: String,
            required: true
        },
        emergency_contact_address: {
            type: String,
            required: true
        },
        emergency_contact_no: {
            type: Number,
            required: true
        },
        emergency_contact_relationship: {
            type: String,
            required: true
        },
        job_location: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        joining_date: {
            type: Date,
            required: true
        },
        bank_name: {
            type: String,
            required: true
        },
        branch_name: {
            type: String,
            required: true
        },
        account_no: {
            type: Number,
            required: true
        },
        IFSC_code: {
            type: String,
            required: true
        },
        PAN_no: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        shift_id: {
            type: String,
            required: true
        },
        fcm_token: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = { Employee };
