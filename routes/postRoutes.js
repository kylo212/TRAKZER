const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { body, validationResult } = require('express-validator');

const validatePost = [
  body('content').notEmpty().withMessage('Content is required').isLength({ max: 3000 }).withMessage('Content should be less than 3000 words'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', validatePost, handleValidationErrors, postController.createPost);
router.get('/:userId', postController.getPostsByUser);
router.get('/', postController.getAllPosts);

module.exports = router;
