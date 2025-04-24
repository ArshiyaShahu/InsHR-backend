const express = require('express');
const mongoose = require('mongoose');
const checkincheckout = require('../models/checkincheckout');

const router = express.Router();

/**
 * @swagger
 * /v1/api/checkincheckout:
 *   post:
 *     summary: Create a new Check-In/Check-Out record
 *     tags: [Check-In Check-Out]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company_id
 *               - employee_id
 *               - employee_name
 *               - checkin_time
 *               - checkin_latitudes
 *               - checkin_longitudes
 *             properties:
 *               company_id:
 *                 type: string
 *               employee_id:
 *                 type: number
 *               employee_name:
 *                 type: string
 *               checkin_time:
 *                 type: string
 *               checkout_time:
 *                 type: string
 *               checkin_latitudes:
 *                 type: string
 *               checkin_longitudes:
 *                 type: string
 *               checkout_latitudes:
 *                 type: string
 *               checkout_longitudes:
 *                 type: string
 *               break_in:
 *                 type: string
 *               break_out:
 *                 type: string
 *               late:
 *                 type: string
 *                 enum: [Yes, No]
 *               Production_hours:
 *                 type: string
 *     responses:
 *       201:
 *         description: Check-In/Check-Out record created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
    try {
        const { company_id } = req.body;

        // Validate company
        const companyExists = await mongoose.connection.db.collection('companies').findOne({ company_id });

        if (!companyExists) {
            return res.status(400).json({ message: "Invalid Company ID" });
        }

        // Create and save the new record
        const newRecord = new checkincheckout(req.body);
        const savedRecord = await newRecord.save();

        res.status(201).json({
            message: "Check-In/Check-Out record created successfully",
            data: savedRecord
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
