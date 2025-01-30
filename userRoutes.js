const express = require('express');
const router = express.Router();


const users = [
  { id: 1, name: 'Narein Kylo', email: 'nareinjunior7@gmail.com' },
  { id: 2, name: 'Delick Junior', email: 'nareinkylo@gmail.com' }
];


router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Users list',
    data: users
  });
});

module.exports = router;
