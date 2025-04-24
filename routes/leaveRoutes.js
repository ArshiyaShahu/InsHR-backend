const express = require('express');
const mongoose = require('mongoose');
const Leave = require('../models/leave');

const router = express.Router();

/**
 * @swagger
 * /v1/api/leave:
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

/**
 * @swagger
 * /v1/api/leave:
 *   get:
 *     summary: Get All Leave Requests
 *     tags: [Leave]
 *     responses:
 *       200:
 *         description: List of all leave requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   employee_id:
 *                     type: number
 *                   company_id:
 *                     type: string
 *                   leave_type:
 *                     type: string
 *                   start_date:
 *                     type: string
 *                   end_date:
 *                     type: string
 *                   no_days:
 *                     type: number
 *                   reason:
 *                     type: string
 *                   request_date:
 *                     type: string
 *                   half_day:
 *                     type: boolean
 *                   status:
 *                     type: string
 *       500:
 *         description: Server Error
 */
router.get('/', async (req, res) => {
    try {
        const leaves = await Leave.find();
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
