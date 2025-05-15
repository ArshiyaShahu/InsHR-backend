const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Profile = require('../models/profile');

/**
 * @swagger
 * /v1/profile:
 *   post:
 *     summary: Create a new user profile
 *     tags: [My Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - email_address
 *               - phone_number
 *               - personal_address
 *               - professional
 *             properties:
 *               full_name:
 *                 type: string
 *               email_address:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               personal_address:
 *                 type: string
 *               professional:
 *                 type: object
 *                 required:
 *                   - address
 *                   - designation
 *                   - company_email_address
 *                   - employee_type
 *                   - department
 *                   - reporting_person
 *                   - company_experience
 *                   - office_time
 *                 properties:
 *                   address:
 *                     type: string
 *                   designation:
 *                     type: string
 *                   company_email_address:
 *                     type: string
 *                   employee_type:
 *                     type: string
 *                   department:
 *                     type: string
 *                   reporting_person:
 *                     type: string
 *                   company_experience:
 *                     type: string
 *                   office_time:
 *                     type: string
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
 *     responses:
 *       200:
 *         description: Profile saved successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
  try {
    const {
      full_name,
      email_address,
      phone_number,
      personal_address,
      professional,
      documents,
    } = req.body;

    let profile = await Profile.findOne({ email_address });

    if (profile) {
      profile.full_name = full_name;
      profile.phone_number = phone_number;
      profile.personal_address = personal_address;
      profile.professional = professional;
      profile.documents = documents;
    } else {
      profile = new Profile({
        full_name,
        email_address,
        phone_number,
        personal_address,
        professional,
        documents,
      });
    }

    await profile.save();
    res.status(200).json({ message: 'Profile saved successfully', profile });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(400).json({ message: 'Error saving profile', error: error.message });
  }
});

/**
 * @swagger
 * /v1/profile/{email_address}:
 *   put:
 *     summary: Update an existing user profile by email address
 *     tags: [My Profile]
 *     parameters:
 *       - in: path
 *         name: email_address
 *         required: true
 *         schema:
 *           type: string
 *         description: The email address of the profile to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               personal_address:
 *                 type: string
 *               professional:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                   designation:
 *                     type: string
 *                   company_email_address:
 *                     type: string
 *                   employee_type:
 *                     type: string
 *                   department:
 *                     type: string
 *                   reporting_person:
 *                     type: string
 *                   company_experience:
 *                     type: string
 *                   office_time:
 *                     type: string
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
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Profile not found
 *       400:
 *         description: Update failed
 */
router.put('/:email_address', async (req, res) => {
  try {
    const { email_address } = req.params;
    const {
      full_name,
      phone_number,
      personal_address,
      professional,
      documents,
    } = req.body;

    const profile = await Profile.findOne({ email_address });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    profile.full_name = full_name || profile.full_name;
    profile.phone_number = phone_number || profile.phone_number;
    profile.personal_address = personal_address || profile.personal_address;
    profile.professional = professional || profile.professional;
    profile.documents = documents || profile.documents;

    await profile.save();
    res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(400).json({ message: 'Error updating profile', error: error.message });
  }
});

module.exports = router;
