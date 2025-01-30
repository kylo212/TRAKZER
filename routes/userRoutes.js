
const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: 'Users list fetched successfully',
      data: users
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching users',
      error: err.message
    });
  }
});

module.exports = router;
