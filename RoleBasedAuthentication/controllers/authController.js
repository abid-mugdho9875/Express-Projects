// controllers/authController.js
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const crypto = require('crypto');

// Generate a random secret key and store it securely
const secretKey = "password";

exports.login = (req, res) => {
  const { username, password } = req.body;
  const userRecord = user.findByUsername(username);

  if (userRecord && userRecord.password === password) {
    const token = jwt.sign({ id: userRecord.id, role: userRecord.role }, secretKey);
    res.json({ message: 'Login successful', token });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
};
