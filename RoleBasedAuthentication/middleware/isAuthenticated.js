// middleware/isAuthenticated.js
const jwt = require('jsonwebtoken');


// Generate a random secret key and store it securely
const secretKey = "password";// Replace with the same secret key used for token creation

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token, secretKey)
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
