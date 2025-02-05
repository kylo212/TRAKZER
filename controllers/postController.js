const Post = require('../models/post');

exports.createPost = async (req, res) => {
    try {
        const { userId, content } = req.body;
        const newPost = new Post({ userId, content, likes: [], comments: [], shares: [] });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: 'Error creating post', error });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'username');
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching posts', error });
    }
};

exports.likePost = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter((id) => id !== userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: 'Error liking post', error });
    }
};

exports.commentOnPost = async (req, res) => {
    try {
        const { postId, userId, comment } = req.body;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const newComment = { userId, comment, createdAt: new Date() };
        post.comments.push(newComment);
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: 'Error commenting on post', error });
    }
};

exports.sharePost = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const newShare = { userId, sharedAt: new Date() };
        post.shares.push(newShare);
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: 'Error sharing post', error });
    }
};
