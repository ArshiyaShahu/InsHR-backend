const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Profile = require('../models/profile'); 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// POST API to create a profile
/**
 * @swagger
 * /v1/profile:
 *   post:
 *     summary: Create a new profile
 *     tags: [My Profile]
 *     description: Create a new profile for the employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               designation:
 *                 type: string
 *               company_email:
 *                 type: string
 *               employee_type:
 *                 type: string
 *               department:
 *                 type: string
 *               reporting_person:
 *                 type: string
 *               experience:
 *                 type: string
 *               office_time:
 *                 type: string
 *               documents:
 *                 type: object
 *                 properties:
 *                   offer_letter:
 *                     type: string
 *                   appointment_letter:
 *                     type: string
 *                   bond_agreement:
 *                     type: string
 *                   appraisal_letter:
 *                     type: string
 *                   salary_slip:
 *                     type: string
 *               company_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', [
    body('full_name').notEmpty().withMessage('Full Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('company_id').notEmpty().withMessage('Company ID is required')
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const {
      full_name, email, phone, address, designation, company_email,
      employee_type, department, reporting_person, experience,
      office_time, documents, company_id
    } = req.body;
  
    try {
      const companyExists = await require('mongoose').connection.db.collection('companies').findOne({ company_id });
  
      if (!companyExists) {
        return res.status(400).json({ message: "Invalid Company ID" });
      }
  
      const newProfile = new Profile({
        full_name,
        email,
        phone,
        address,
        designation,
        company_email,
        employee_type,
        department,
        reporting_person,
        experience,
        office_time,
        documents,
        company_id
      });
  
      await newProfile.save();
      res.status(201).json(newProfile);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
/**
 * @swagger
 * /v1/profile/email/{email}:
 *   put:
 *     summary: Update an existing profile using email
 *     tags: [My Profile]
 *     description: Update the details of an existing profile by its email (email can also be updated).
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Current email of the profile to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               designation:
 *                 type: string
 *               company_email:
 *                 type: string
 *               employee_type:
 *                 type: string
 *               department:
 *                 type: string
 *               reporting_person:
 *                 type: string
 *               experience:
 *                 type: string
 *               office_time:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Profile not found
 */
router.put('/email/:email', [
  body('full_name').notEmpty().withMessage('Full Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const currentEmail = req.params.email;
    const profile = await Profile.findOne({ email: currentEmail });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const {
      full_name,
      email,
      phone,
      address,
      designation,
      company_email,
      employee_type,
      department,
      reporting_person,
      experience,
      office_time
    } = req.body;

    // Update fields (email placed between full_name and phone)
    profile.full_name = full_name || profile.full_name;
    profile.email = email || profile.email;
    profile.phone = phone || profile.phone;
    profile.address = address || profile.address;
    profile.designation = designation || profile.designation;
    profile.company_email = company_email || profile.company_email;
    profile.employee_type = employee_type || profile.employee_type;
    profile.department = department || profile.department;
    profile.reporting_person = reporting_person || profile.reporting_person;
    profile.experience = experience || profile.experience;
    profile.office_time = office_time || profile.office_time;

    await profile.save();
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===================== change notifications setting- post ======================================

/**
 * @swagger
 * /v1/profile/notification:
 *   post:
 *     summary: Update notification settings (ON/OFF)
 *     tags: [notification]
 *     description: Change individual notification options (true for ON, false for OFF)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               announcements:
 *                 type: boolean
 *                 example: true
 *               task_updates:
 *                 type: boolean
 *                 example: false
 *               policy_changes:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Notification settings updated successfully
 *       404:
 *         description: Profile not found
 */
router.post('/notification', async (req, res) => {
  const { email, announcements, task_updates, policy_changes } = req.body;

  try {
    const profile = await Profile.findOne({ email });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    if (announcements !== undefined) profile.notification.announcements = announcements;
    if (task_updates !== undefined) profile.notification.task_updates = task_updates;
    if (policy_changes !== undefined) profile.notification.policy_changes = policy_changes;

    await profile.save();

    res.status(200).json({ message: 'Notification updated successfully', profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===================== Delete Account API =========================================================
/**
 * @swagger
 * /v1/api/delete-account:
 *   post:
 *     summary: Delete an employee account
 *     tags:
 *       - Delete Account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company_id:
 *                 type: string
 *               employee_id:
 *                 type: number
 *               password:
 *                 type: string
 *             required:
 *               - company_id
 *               - employee_id
 *               - password
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       400:
 *         description: All fields are required
 *       401:
 *         description: Invalid password
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */

router.post('/delete-account', async (req, res) => {
  try {
    const { company_id, employee_id, password } = req.body;

    if (!company_id || !employee_id || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the employee based on company_id and employee_id
    const employee = await Profile.findOne({ 
      company_id: company_id,
      employee_id: employee_id
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Correct password check from actual stored field
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Delete employee
    await Profile.deleteOne({ _id: employee._id });

    return res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete Account Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
