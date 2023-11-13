const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
    // check header
    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new UnauthenticatedError('Authentication invalid')
    }
     // Extract the token by removing the 'Bearer ' prefix
     const token = authHeader.slice(7); // 'Bearer '.length = 7
     console.log('Token:', token);
   
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      console.log(payload)
      // attach the user to the job routes
      req.user = payload
      next()
    } catch (error) {
      throw new UnauthenticatedError('Authentication invalid')
    }
  }
  
  module.exports = auth