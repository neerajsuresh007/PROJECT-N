
const express = require('express');
const router = express.Router();
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

// create a user (for demo). In production protect this route.
router.post('/register', async (req,res) => {
  const { username, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const result = await pool.query('INSERT INTO users(username, password_hash, role) VALUES($1,$2,$3) RETURNING id, username, role', [username, hash, role]);
  res.json(result.rows[0]);
});

// login
router.post('/login', async (req,res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT id, username, password_hash, role FROM users WHERE username=$1', [username]);
  if (!result.rows.length) return res.status(401).json({ error: 'Invalid credentials' });
  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '8h' });
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

module.exports = router;
