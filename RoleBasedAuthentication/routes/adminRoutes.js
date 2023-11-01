// routes/adminRoutes.js
const express = require('express');
const adminController = require('../controllers/adminController');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.get('/admin_panel', isAdmin, adminController.adminPanel);

module.exports = router;
