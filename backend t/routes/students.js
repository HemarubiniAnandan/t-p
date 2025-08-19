const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

// Get all students for logged-in teacher
router.get('/', authMiddleware, async (req, res) => {
    try {
        const [students] = await db.promise().query(
            'SELECT * FROM students WHERE teacher_id = ?', 
            [req.teacher.id]
        );
        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a new student
router.post('/', authMiddleware, async (req, res) => {
    const { name, register_no, phone, father_name, mother_name, father_contact, mother_contact, arrears } = req.body;
    try {
        await db.promise().query(
            `INSERT INTO students (name, register_no, phone, father_name, mother_name, father_contact, mother_contact, arrears, teacher_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, register_no, phone, father_name, mother_name, father_contact, mother_contact, arrears || 0, req.teacher.id]
        );
        res.status(201).json({ message: 'Student added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update student
router.put('/:id', authMiddleware, async (req, res) => {
    const { name, register_no, phone, father_name, mother_name, father_contact, mother_contact, arrears } = req.body;
    try {
        await db.promise().query(
            `UPDATE students SET name=?, register_no=?, phone=?, father_name=?, mother_name=?, father_contact=?, mother_contact=?, arrears=? 
             WHERE id=? AND teacher_id=?`,
            [name, register_no, phone, father_name, mother_name, father_contact, mother_contact, arrears, req.params.id, req.teacher.id]
        );
        res.json({ message: 'Student updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete student
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await db.promise().query(
            'DELETE FROM students WHERE id=? AND teacher_id=?',
            [req.params.id, req.teacher.id]
        );
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
