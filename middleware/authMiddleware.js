const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id);
    if (!user) return res.status(400).send('User not found');
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

module.exports = authMiddleware;
