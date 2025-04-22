const express = require('express');
const mongoose = require('mongoose');
const SalaryManagement = require('../models/salary');

const router = express.Router();

/**
 * @swagger
 * /api/salary:
 *   post:
 *     summary: Create Salary Request
 *     tags: [Salary Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company_id
 *               - employee_id
 *               - employee_payment_mode
 *               - request_amount
 *               - reason
 *             properties:
 *               company_id:
 *                 type: string
 *               employee_id:
 *                 type: number
 *               employee_payment_mode:
 *                 type: string
 *                 enum: [Bank Account, Cash, Cheque, Other]
 *               request_amount:
 *                 type: number
 *               reason:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Pending, Approved, Rejected, Processed]
 *               accepted_amount:
 *                 type: number
 *               approval_message:
 *                 type: string
 *               owner_payment_mode:
 *                 type: string
 *                 enum: [Bank Account, Cash, Cheque, Other]
 *               owner_accepted_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Salary Request Created Successfully
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

        const salaryData = new SalaryManagement(req.body);
        const savedSalary = await salaryData.save();

        res.status(200).json({
            message: "Salary Request Created Successfully",
            data: savedSalary
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/salary:
 *   get:
 *     summary: Get All Salary Requests
 *     tags: [Salary Management]
 *     responses:
 *       200:
 *         description: A list of salary requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Salary'
 *       400:
 *         description: Error retrieving salary requests
 */
router.get('/', async (req, res) => {
    try {
        const salaries = await SalaryManagement.find();
        res.status(200).json({
            message: "Salary Requests Retrieved Successfully",
            data: salaries
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
