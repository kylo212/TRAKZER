const express = require('express');
const Post = require('../models/posts');  // Ensure it matches the filename "posts.js"

const router = express.Router();

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/posts', async (req, res) => {
  try {
    const { username, postText, timestamp } = req.body;
    const newPost = new Post({
      username,
      postText,
      timestamp
    });
    await newPost.save();
    res.status(201).send('Post Created');
  } catch (err) {
    res.status(400).send('Error creating post');
  }
});

module.exports = router;
