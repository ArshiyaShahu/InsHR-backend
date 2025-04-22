const express = require('express');
const mongoose = require('mongoose');
const DailyTask = require('../models/dailytask');

const router = express.Router();

/**
 * @swagger
 * /api/dailytask:
 *   post:
 *     summary: Create Daily Task
 *     tags: [DailyTask]
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
 *               task_type:
 *                 type: string
 *               task_subject:
 *                 type: string
 *               task_description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Daily Task Created Successfully
 *       400:
 *         description: Invalid Data
 */
router.post('/', async (req, res) => {
    try {
        const { company_id } = req.body;

        // Check company_id exists in 'companies' collection
        const companyExists = await mongoose.connection.db.collection('companies').findOne({ company_id });

        if (!companyExists) {
            return res.status(400).json({ message: "Invalid Company ID" });
        }

        const dailyTaskData = new DailyTask(req.body);
        const savedDailyTask = await dailyTaskData.save();

        res.status(200).json({
            message: "Daily Task Created Successfully",
            data: savedDailyTask
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/dailytask:
 *   get:
 *     summary: Get All Daily Tasks
 *     tags: [DailyTask]
 *     responses:
 *       200:
 *         description: List of all daily tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   company_id:
 *                     type: string
 *                   employee_id:
 *                     type: number
 *                   task_type:
 *                     type: string
 *                   task_subject:
 *                     type: string
 *                   task_description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
    try {
        const tasks = await DailyTask.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
