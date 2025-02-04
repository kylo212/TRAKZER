const Post = require('../models/Post');

const createPost = async (req, res) => {
    try {
        const { userId, content } = req.body;
        const newPost = new Post({ userId, content });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post' });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'username');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
};

module.exports = { createPost, getPosts };
