const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email_address: { type: String, required: true },
  phone_number: { type: String, required: true },
  personal_address: { type: String, required: true },

  professional: {
    address: { type: String, required: true },
    designation: { type: String, required: true },
    company_email_address: { type: String, required: true },
    employee_type: { type: String, required: true },
    department: { type: String, required: true },
    reporting_person: { type: String, required: true },
    company_experience: { type: String, required: true },
    office_time: { type: String, required: true }
  },

  documents: {
    offer_letter: { type: String },
    appointment_letter: { type: String },
    bond_agreement: { type: String },
    appraisal_letter: { type: String },
    salary_slip: { type: String }
  }
});

module.exports = mongoose.model('Profile', profileSchema);
