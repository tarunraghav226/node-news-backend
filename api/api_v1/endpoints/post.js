const express = require("express");
const upload = require("../../dependencies/imageHandler");
const catchAsync = require("../../../utils/catchAsync");
const Post = require("../../../models/post");
const { protect } = require("../../dependencies/authHandler");

const postRouter = express.Router();

const createPost = catchAsync(async (req, res, next) => {
  const post = await Post.create({
    title: req.body.title,
    summary: req.body.summary,
    content: req.body.content,
    owner: req.user[0].userID,
    coverImageURL: req.body.coverImageUrl,
  });
  res.status(201).json({
    post,
  });
});

const getPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    posts: posts,
  });
});

const getPost = catchAsync(async (req, res, next) => {
  const { postID } = req.params;
  const post = await Post.findOne({ postID });
  res.status(200).json({ post });
});

postRouter.route("/").post(protect, createPost).get(getPosts);

postRouter.route("/:postID").get(getPost);
module.exports = postRouter;
