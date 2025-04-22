const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    company_code: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
