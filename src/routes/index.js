const express = require('express');
const loginRoutes = require('./login');
const dashboardController = require('../controllers/dashboard.controller');
const requireLogin = require('../middlewares/requireLogin');

const router = express.Router();

router.use('/login', loginRoutes);

router.get('/', requireAuth, dashboardController.index);

module.exports = router;
