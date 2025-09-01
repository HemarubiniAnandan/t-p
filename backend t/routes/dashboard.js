const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

// Dashboard route
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Get teacher info
    const [teacherRows] = await db.promise().query(
      "SELECT id, name, email FROM teachers WHERE id = ?",
      [req.teacher.id]
    );

    if (teacherRows.length === 0) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const teacher = teacherRows[0];

    // Get classes handled by teacher
    const [classRows] = await db.promise().query(
      "SELECT id, department, section, year FROM classes WHERE teacher_id = ?",
      [req.teacher.id]
    );

    res.json({
      teacher,
      classes: classRows,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
