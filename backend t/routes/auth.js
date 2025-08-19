const express = require('express');
const router = express.Router();
const db = require('../db'); // your MySQL connection
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // to load JWT_SECRET from .env

// Teacher Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Fetch teacher by email
        const [rows] = await db.promise().query(
            'SELECT * FROM teachers WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            console.log(`Login failed: No teacher found with email ${email}`);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const teacher = rows[0];

        // Compare plain password to stored bcrypt hash
        const isMatch = await bcrypt.compare(password, teacher.password_hash);
        if (!isMatch) {
            console.log(`Login failed: Password mismatch for ${email}`);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: teacher.id, name: teacher.name, email: teacher.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
