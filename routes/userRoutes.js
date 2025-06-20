const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyFirebaseToken = require('../middlewares/verifyFirebaseToken');

// Verify Firebase token
router.post('/verify', verifyFirebaseToken, (req, res) => {
  res.json({
    message: 'User authenticated',
    uid: req.user.uid,
    email: req.user.email,
  });
});

// Create user (protected)
router.post('/', verifyFirebaseToken, async (req, res) => {
  try {
    const newUser = new User(req.body);
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users (protected)
router.get('/', verifyFirebaseToken, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
