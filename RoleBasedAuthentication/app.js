// app.js
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// JWT Configuration
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const secretKey = 'password'; // Replace with a secure secret key

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
}, (jwtPayload, done) => {
  // In a production environment, you might want to validate the user or retrieve user data here.
  done(null, jwtPayload);
}));

app.use(passport.initialize());

// Routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
