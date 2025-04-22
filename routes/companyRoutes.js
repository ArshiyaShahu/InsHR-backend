const express = require('express');
const router = express.Router();
const Company = require('../models/company');

/**
 * @swagger
 * /api/company:
 *   post:
 *     summary: Create new company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company_code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verify company code successfully
 *       400:
 *         description: Invalid company code
 *       500:
 *         description: Server Error
 */

router.post('/', async (req, res) => {
    try {
        const { company_code } = req.body;

        if (!company_code) {
            return res.status(400).json({ error: "Company code is required" });
        }

       
        if (company_code !== 'ins1001') {
            return res.status(400).json({ error: "Invalid company code" });
        }

        const existingCompany = await Company.findOne({ company_code });
        if (existingCompany) {
            return res.status(200).json({ message: "Company already verified", data: existingCompany });
        }

        const newCompany = new Company({ company_code });
        await newCompany.save();

        res.status(200).json({ message: "Verify company code successfully", data: newCompany });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
