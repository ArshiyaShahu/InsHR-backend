const mongoose = require('mongoose');

const AssignTaskSchema = new mongoose.Schema({
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
  },
  task_start_date: {
    type: Date,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  task_completed_date: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  task_added_date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('assigntasks', AssignTaskSchema);
