const express = require('express');
const router = express.Router();
const CheckInCheckOut = require('../models/checkincheckout');

/**
 * @swagger
 * /v1/api/attendance:
 *   get:
 *     summary: Get attendance data by month (formatted date)
 *     tags: [Attendance]
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *         required: true
 *         description: Month in format YYYY-MM (e.g., 2025-04)
 *     responses:
 *       200:
 *         description: Formatted attendance data
 */

router.get('/', async (req, res) => {
  try {
    const { month } = req.query;

    if (!month || !/^\d{4}-\d{2}$/.test(month)) {
      return res.status(400).json({ message: 'Month is required in format YYYY-MM (e.g., 2025-04)' });
    }

    const startDate = new Date(`${month}-01T00:00:00Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const records = await CheckInCheckOut.find({
      date: { $gte: startDate, $lt: endDate }
    }).sort({ date: 1 });

    const formattedData = records.map(entry => {
      const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      return {
        date: formattedDate, 
        checkIn: entry.checkin_time || 'N/A',
        checkOut: entry.checkout_time || 'N/A'
      };
    });

    res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching attendance data', error: err });
  }
});

module.exports = router;
