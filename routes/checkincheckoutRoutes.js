const express = require('express');
const mongoose = require('mongoose');
const CheckInCheckOut = require('../models/checkincheckout');

const router = express.Router();

/**
 * @swagger
 * /api/checkincheckout:
 *   post:
 *     summary: Create Check-In Check-Out Entry
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
 *               - checkin_time
 *               - checkout_time
 *             properties:
 *               company_id:
 *                 type: string
 *               employee_id:
 *                 type: number
 *               checkin_time:
 *                 type: string
 *                 format: date-time
 *               checkout_time:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               remark:
 *                 type: string
 *     responses:
 *       200:
 *         description: Check-In Check-Out Entry Created Successfully
 *       400:
 *         description: Invalid Data
 */

router.post('/', async (req, res) => {
    try {
        const { company_id } = req.body;

        const companyExists = await mongoose.connection.db.collection('companies').findOne({ company_id });

        if (!companyExists) {
            return res.status(400).json({ message: "Invalid Company ID" });
        }

        const checkData = new CheckInCheckOut(req.body);
        const savedData = await checkData.save();

        res.status(200).json({
            message: "Check-In Check-Out Entry Created Successfully",
            data: savedData
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
