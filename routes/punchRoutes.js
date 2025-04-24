const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CheckInCheckOut = require('../models/checkincheckout'); 

// ===================== Swagger Tags =====================
/**
 * @swagger
 * tags:
 *   name: Punch
 *   description: Punch Page & History APIs
 */

// ===================== GET Punch Page =====================
/**
 * @swagger
 * /v1/punch/today:
 *   get:
 *     summary: Get today's punch details for the employee
 *     tags: [Punch]
 *     parameters:
 *       - in: query
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Today's attendance
 */
router.get('/today', async (req, res) => {
    try {
        const employeeId = req.query.employee_id;

        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const record = await CheckInCheckOut.findOne({
            employee_id: employeeId,
            date: { $gte: start, $lte: end },
        });

        if (!record) {
            return res.status(404).json({ message: 'No record found for today' });
        }

        const totalDays = await CheckInCheckOut.countDocuments({ employee_id: employeeId });

        res.json({
            check_in: record.checkin_time || "Not Available",
            check_out: record.checkout_time || "Not Available",
            break_time: record.break_in || "Not Available", 
            total_days: totalDays,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});



// ===================== GET Punch History =====================
/**
 * @swagger
 * /v1/punch/history:
 *   get:
 *     summary: Get full punch history for the month
 *     tags: [Punch]
 *     parameters:
 *       - in: query
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *         description: Month in YYYY-MM format (e.g. 2025-04)
 *     responses:
 *       200:
 *         description: Monthly punch history
 */
router.get('/history', async (req, res) => {
    try {
        const { employee_id, month } = req.query;

        if (!employee_id || !month || !/^\d{4}-\d{2}$/.test(month)) {
            return res.status(400).json({ message: 'Invalid or missing employee_id or month. Format should be YYYY-MM' });
        }

        const start = new Date(`${month}-01T00:00:00.000Z`);
        const end = new Date(start);
        end.setMonth(end.getMonth() + 1); 

        const records = await CheckInCheckOut.find({
            employee_id,
            date: { $gte: start, $lt: end },
        }).sort({ date: -1 });

        const history = records.map(r => ({
            date: r.date,
            check_in: r.checkin_time || "Not Available",
            break_in: r.break_in || "Not Available",
            break_out: r.break_out || "Not Available",
            check_out: r.checkout_time || "Not Available",
        }));

        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
    