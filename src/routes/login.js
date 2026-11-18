const express = require('express');
const authController = require('../controllers/auth.controller');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.post('/logout', requireAuth, authController.logout);

module.exports = router;