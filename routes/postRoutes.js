const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/create', postController.createPost);
router.get('/all', postController.getPosts);
router.post('/like', postController.likePost);
router.post('/comment', postController.commentOnPost);
router.post('/share', postController.sharePost);

module.exports = router;
