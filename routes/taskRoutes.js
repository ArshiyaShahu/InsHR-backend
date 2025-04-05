const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

/**
 * @swagger
 * /api/task:
 *   get:
 *     summary: Get all tasks
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: Task List
 */
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/task:
 *   post:
 *     summary: Add new task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskType
 *               - taskSubject
 *               - taskDescription
 *             properties:
 *               taskType:
 *                 type: string
 *               taskSubject:
 *                 type: string
 *               taskDescription:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post('/', async (req, res) => {
    try {
        const { taskType, taskSubject, taskDescription } = req.body;

        const newTask = new Task({
            taskType,
            taskSubject,
            taskDescription,
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
