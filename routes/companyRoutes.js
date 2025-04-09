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
 *         description: verify companycode Successfully
 *       500:
 *         description: Server Error
 */

router.post('/', async (req, res) => {
    try {
        const { company_code } = req.body;

        if (!company_code) {
            return res.status(400).json({ error: "Company code is required" });
        }

        const newCompany = new Company({ company_code });
        await newCompany.save();

        res.status(200).json({ message: "verify companycode Successfully", data: newCompany });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
