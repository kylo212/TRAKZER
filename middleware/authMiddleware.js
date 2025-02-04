const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });

    req.user = await User.findById(user.id);
    next();
  });
};

module.exports = { authenticateToken };
