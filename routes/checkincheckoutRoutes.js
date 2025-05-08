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
 *               break_time:  # Added the break_time field here
 *                 type: string
 *                 description: The total break time taken during the shift (calculated based on break_in and break_out)
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
        const { company_id, break_in, break_out } = req.body;

        // Validate company
        const companyExists = await mongoose.connection.db.collection('companies').findOne({ company_id });

        if (!companyExists) {
            return res.status(400).json({ message: "Invalid Company ID" });
        }

        // Calculate break time if break_in and break_out are present
        let breakTime = "Not Available";
        if (break_in && break_out) {
            const convertTo24HrFormat = (timeStr) => {
                const [time, modifier] = timeStr.split(" ");
                let [hours, minutes] = time.split(":").map(Number);
                if (modifier === "PM" && hours !== 12) hours += 12;
                if (modifier === "AM" && hours === 12) hours = 0;
                const date = new Date();
                date.setHours(hours, minutes, 0, 0);
                return date;
            };

            const breakInTime = convertTo24HrFormat(break_in);
            const breakOutTime = convertTo24HrFormat(break_out);

            if (!isNaN(breakInTime.getTime()) && !isNaN(breakOutTime.getTime())) {
                const totalBreakTime = breakOutTime - breakInTime;
                const totalBreakTimeInMinutes = Math.floor(totalBreakTime / 60000);
                const hours = Math.floor(totalBreakTimeInMinutes / 60);
                const minutes = totalBreakTimeInMinutes % 60;
                breakTime = `${hours} hours ${minutes} minutes`;
            } else {
                breakTime = "Invalid break times";
            }
        }

        req.body.break_time = breakTime;

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
