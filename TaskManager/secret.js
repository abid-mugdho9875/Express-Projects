const crypto = require('crypto');

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Script is running')
console.log('Secure Secret Key:', secretKey);