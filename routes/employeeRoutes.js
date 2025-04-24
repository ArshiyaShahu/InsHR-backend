const express = require("express");
const mongoose = require("mongoose");
const { Employee } = require("../models/employee");
const bcrypt = require("bcrypt");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: Employee Management API
 */

/**
 * @swagger
 * /v1/api/employee:
 *   post:
 *     summary: Create a new Employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company_id
 *               - employee_id
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *               - employee_address
 *               - contact_no
 *               - gender
 *               - date_of_birth
 *               - marital_status
 *               - emergency_contact_name
 *               - emergency_contact_address
 *               - emergency_contact_no
 *               - emergency_contact_relationship
 *               - job_location
 *               - title
 *               - joining_date
 *               - bank_name
 *               - branch_name
 *               - account_no
 *               - IFSC_code
 *               - PAN_no
 *               - status
 *               - shift_id
 *               - fcm_token
 *             properties:
 *               company_id:
 *                 type: string
 *               employee_id:
 *                 type: number
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               employee_address:
 *                 type: string
 *               contact_no:
 *                 type: number
 *               gender:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               marital_status:
 *                 type: string
 *               emergency_contact_name:
 *                 type: string
 *               emergency_contact_address:
 *                 type: string
 *               emergency_contact_no:
 *                 type: number
 *               emergency_contact_relationship:
 *                 type: string
 *               job_location:
 *                 type: string
 *               title:
 *                 type: string
 *               joining_date:
 *                 type: string
 *                 format: date
 *               bank_name:
 *                 type: string
 *               branch_name:
 *                 type: string
 *               account_no:
 *                 type: number
 *               IFSC_code:
 *                 type: string
 *               PAN_no:
 *                 type: string
 *               status:
 *                 type: string
 *               shift_id:
 *                 type: string
 *               fcm_token:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee Created Successfully
 *       400:
 *         description: Invalid Company ID or Employee Already Exists
 *       500:
 *         description: Internal Server Error
 */

// Employee Create API
router.post("/", async (req, res) => {
    try {
        const {
            company_id, employee_id, email, password,
            ...rest
        } = req.body;

        const company = await mongoose.connection.db.collection('companies').findOne({ company_id });

        if (!company) {
            return res.status(400).json({ message: "Invalid Company ID" });
        }

        const existingEmployee = await Employee.findOne({
            $or: [{ email }, { employee_id }]
        });

        if (existingEmployee) {
            return res.status(400).json({ message: "Employee Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newEmployee = new Employee({
            company_id,
            employee_id,
            email,
            password: hashedPassword,
            ...rest
        });

        await newEmployee.save();

        res.status(201).json({
            message: "Employee Created Successfully",
            data: newEmployee,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
