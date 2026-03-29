const express = require('express');
const cors = require('cors');
require('dotenv').config();

const path = require('path');
const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, '../dist')));

// --- ROUTES ---

// Basic check
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the UIT Tracker Backend API' });
});

// ==== USERS API ====

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, email, role, created_at FROM users');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Create a new user (Note: passwords should be hashed in production using bcrypt!)
app.post('/api/users', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, password, role || 'admin']
        );
        res.status(201).json({ id: result.insertId, name, email, role: role || 'admin' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

// ==== INTERNS API ====

// Get all interns
app.get('/api/interns', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM interns');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching interns' });
    }
});

// Get a single intern
app.get('/api/interns/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM interns WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Intern not found' });
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching intern' });
    }
});

// Add a new intern
app.post('/api/interns', async (req, res) => {
    const { name, stage, badge, attendance, tasks, streak, status, initials } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO interns (name, stage, badge, attendance, tasks, streak, status, initials) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, stage || 1, badge || 'Explorer', attendance || 0, tasks || 0, streak || 0, status || '绿', initials]
        );
        res.status(201).json({ id: result.insertId, name, stage, badge, attendance, tasks, streak, status, initials });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating intern' });
    }
});

// Update intern status
app.put('/api/interns/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await db.query('UPDATE interns SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Intern status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating intern' });
    }
});

// AFTER all API routes, add the catch-all to serve index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});


// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
