const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  // Employee fields
  company_id: { type: String, required: true },
  employee_id: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, lowercase: true, required: true, unique: true },
  password: { type: String, required: true },
  employee_address: { type: String, required: true },
  contact_no: { type: Number, required: true },
  gender: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  marital_status: { type: String, required: true },
  emergency_contact_name: { type: String, required: true },
  emergency_contact_address: { type: String, required: true },
  emergency_contact_no: { type: Number, required: true },
  emergency_contact_relationship: { type: String, required: true },
  job_location: { type: String, required: true },
  title: { type: String, required: true },
  joining_date: { type: Date, required: true },
  bank_name: { type: String, required: true },
  branch_name: { type: String, required: true },
  account_no: { type: Number, required: true },
  IFSC_code: { type: String, required: true },
  PAN_no: { type: String, required: true },
  status: { type: String, required: true },
  shift_id: { type: String, required: true },
  fcm_token: { type: String, required: true },

  // Profile extra fields
  full_name: { type: String },
  phone: { type: String },
  address: { type: String },
  designation: { type: String },
  company_email: { type: String },
  employee_type: { type: String },
  department: { type: String },
  reporting_person: { type: String },
  experience: { type: String },
  office_time: { type: String },

  // Documents
  documents: {
    offer_letter: { type: String },
    appointment_letter: { type: String },
    bond_agreement: { type: String },
    appraisal_letter: { type: String },
    salary_slip: { type: String }
  },

  // Notification settings
  notification: {
    announcements: { type: Boolean, default: true },
    task_updates: { type: Boolean, default: true },
    policy_changes: { type: Boolean, default: true }
  },

  // Delete Account
  delete_account: {
    company_code: { type: String },
    employee_id: { type: String },
    password: { type: String }
  }
}, { 
  timestamps: true,
  collection: 'employees' 
});

module.exports = mongoose.model('Profile', profileSchema);
