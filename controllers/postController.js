const Post = require("../models/postModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });

  res.status(200).json(posts);
};

const getPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }

  res.status(200).json(post);
};

const createPost = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Please fill in the field." });
  }
  if (content.length > 256) {
    return res.status(400).json({ error: "256 characters is the max." });
  }
  try {
    const user = req.user;
    const post = await Post.create({ content, user });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await Post.findOneAndDelete({ _id: id });

  if (!post) {
    return res.status(400).json({ error: "No such post" });
  }

  res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  const post = await Post.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!post) {
    return res.status(400).json({ error: "No such post" });
  }

  res.status(200).json(post);
};

const getUserPosts = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User not found." });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ error: "User not found." });
  }

  const userId = user._id.toString();
  const posts = await Post.find({});

  const userPosts = posts.filter((post) => post.user.id == userId);
  return res.status(200).json(userPosts);
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  getUserPosts,
};
