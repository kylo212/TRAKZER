const Post = require('../models/post');

exports.createPost = async (req, res) => {
  try {
    const { content, userId } = req.body;
    const newPost = new Post({ content, user: userId });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};
