const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

// Get teacher dashboard info
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const teacherId = req.user.id;
    // Fetch teacher details
    const [teacherRows] = await db.promise().query(
      'SELECT id, name, email FROM teachers WHERE id = ?',
      [teacherId]
    );

    if (teacherRows.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Fetch classes handled by this teacher
    const [classRows] = await db.promise().query(
      'SELECT id, department, section, year FROM classes WHERE teacher_id = ?',
      [teacherId]
    );

    res.json({
      teacher,
      classes: classRows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
