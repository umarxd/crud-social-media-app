const Post = require("../models/postModel");

const checkOwner = async (req, res, next) => {
  const userId = req.user.id.toString();
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (post.user.id.toString() == userId) next();
    else
      res
        .status(401)
        .json({ error: "You are not authorized to delete this post" });
  } catch (error) {
    res.status(401).json({ error: "No post found with this id" });
  }
};

module.exports = checkOwner;
