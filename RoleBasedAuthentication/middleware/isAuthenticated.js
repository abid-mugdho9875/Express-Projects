// middleware/isAuthenticated.js
const jwt = require('jsonwebtoken');
const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InVzZXIiLCJpYXQiOjE2OTg4MzA5Nzl9.CMHfk3WZmoVqI8aFMIs04LV0g_dViX6CQsQVyHBulhg'; // Replace with the same secret key used for token creation

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
