const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AssignTask = require('../models/assigntask');

/**
 * @swagger
 * /api/assigntasks/updatestatusbyemployee/{employee_id}:
 *   patch:
 *     summary: Update task status by employee_id
 *     tags: [Assign Tasks]
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: number
 *         description: Employee ID (from assign task)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: Completed
 *     responses:
 *       200:
 *         description: Task status updated successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */

router.patch('/updatestatusbyemployee/:employee_id', async (req, res) => {
  try {
    const employeeId = parseInt(req.params.employee_id);
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    // Update all tasks by this employee_id
    const result = await AssignTask.updateMany(
      { employee_id: employeeId },
      { $set: { status } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'No tasks found for this employee' });
    }

    res.status(200).json({
      message: `Task status updated for ${result.modifiedCount} task(s)`,
      result
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
