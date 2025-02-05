const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/update-settings', verifyToken, authController.updateSettings);

module.exports = router;
