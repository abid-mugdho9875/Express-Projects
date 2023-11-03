const express = require('express');
const {signin, signup} = require('../controllers/userController')
const userRouter = express.Router();

//post for signup
userRouter.post('/signup',signup)
//post for signin

userRouter.post('/signin',signin)

module.exports = userRouter;