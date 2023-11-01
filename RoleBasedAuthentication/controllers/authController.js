// controllers/authController.js
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const secretKey = '1234'; // Replace with a secure secret key

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
