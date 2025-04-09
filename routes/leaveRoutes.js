const express = require('express');
const mongoose = require('mongoose');
const Leave = require('../models/leave');

const router = express.Router();

/**
 * @swagger
 * /api/leave:
 *   post:
 *     summary: Create Leave Request
 *     tags: [Leave]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: number
 *               company_id:
 *                 type: number
 *               leave_type:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               no_days:
 *                 type: number
 *               reason:
 *                 type: string
 *               half_day:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Leave Created Successfully
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

        const leaveData = new Leave(req.body);
        const savedLeave = await leaveData.save();

        res.status(200).json({
            message: "Leave Created Successfully",
            data: savedLeave
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
