const express = require('express');
const router = express.Router();
const CheckInCheckOut = require('../models/checkincheckout');

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Attendance management
 */

/**
 * @swagger
 * /api/attendance:
 *   get:
 *     summary: Get only date, check-in time, and check-out time from Check-In/Check-Out data
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: Successfully fetched attendance data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                   checkIn:
 *                     type: string
 *                   checkOut:
 *                     type: string
 *       500:
 *         description: Error fetching attendance data
 */

router.get('/', async (req, res) => {
  try {
    const data = await CheckInCheckOut.find({}, { checkin_time: 1, checkout_time: 1, _id: 0 });

    const formattedData = data.map(entry => {
      const checkIn = entry.checkin_time;
      const checkOut = entry.checkout_time || 'N/A';

      // Format today's date (as no date is stored)
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      return {
        date: formattedDate,
        checkIn: checkIn,
        checkOut: checkOut
      };
    });

    res.status(200).json(formattedData);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching attendance data', error: err });
  }
});


module.exports = router;
