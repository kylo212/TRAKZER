const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

router.post('/posts', async (req, res) => {
  const { content, userId } = req.body;

  try {
    const newPost = new Post({
      content,
      userId,
      timestamp: new Date()
    });

    await newPost.save();
    res.status(201).json({ success: true, post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ timestamp: -1 });
    res.status(200).json({ success: true, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
