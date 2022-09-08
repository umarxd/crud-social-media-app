const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  getUserPosts,
} = require("../controllers/postController");
const requireAuth = require("../middleware/requireAuth");
const checkOwner = require("../middleware/checkOwner");

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", requireAuth, createPost);

router.get("/user/:id", getUserPosts);

router.delete("/:id", requireAuth, checkOwner, deletePost);

router.patch("/:id", requireAuth, checkOwner, updatePost);

module.exports = router;
