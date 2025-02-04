const Post = require('../models/post');

exports.createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    const post = new Post({ title, content, userId });
    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'name email');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};
