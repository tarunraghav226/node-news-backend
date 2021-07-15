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
    coverImageURL: req.file.path,
  });
  res.status(201).json({
    post,
  });
});

postRouter.route("/").post(protect, upload.single("cover-image"), createPost);

module.exports = postRouter;
