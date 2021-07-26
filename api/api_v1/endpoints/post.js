const express = require("express");
const upload = require("../../dependencies/imageHandler");
const catchAsync = require("../../../utils/catchAsync");
const Post = require("../../../models/post");
const Like = require("../../../models/like");
const Comment = require("../../../models/comment");
const { protect } = require("../../dependencies/authHandler");
const AppError = require("../../../utils/appError");

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
  const posts = await Post.find({ is_deleted: false });
  res.status(200).json({
    posts: posts,
  });
});

const getPost = catchAsync(async (req, res, next) => {
  const { postID } = req.params;
  const post = await Post.findOne({ postID, is_deleted: false });
  if (!post) return next(new AppError("Post not found", 404));
  res.status(200).json({ post });
});

const updatePost = catchAsync(async (req, res, next) => {
  const { postID } = req.params;
  await Post.findOneAndUpdate(
    { postID },
    {
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      coverImageURL: req.body.coverImageURL,
    }
  );
  res.status(200).json({
    post: {
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      coverImageURL: req.body.coverImageURL,
    },
  });
});

const deletePost = catchAsync(async (req, res, next) => {
  const { postID } = req.params;
  await Post.findOneAndUpdate({ postID }, { is_deleted: true });
  res.status(200).json({
    message: "Post deleted",
  });
});

const likePost = catchAsync(async (req, res, next) => {
  const { postID } = req.params;
  const { userID } = req.user[0];
  const like = await Like.findOne({ postID, userID });
  let liked = true;
  if (!like) {
    await Like.create({
      postID,
      userID,
    });
  } else {
    await Like.findOneAndDelete({ postID, userID });
    liked = false;
  }
  res.status(200).json({ liked });
});

const addComment = catchAsync(async (req, res, next) => {
  const { postID } = req.params;
  const { userID } = req.user[0];
  const comment = await Comment.create({
    postID,
    userID,
    comment: req.body.comment,
  });
  res.status(201).json({
    comment,
  });
});

const getComments = catchAsync(async (req, res, next) => {
  const { postID } = req.params;
  const skip = parseInt(req.query.skip, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 10;
  const comment = await Comment.find({ postID })
    .sort("-createdAt")
    .skip(skip)
    .limit(limit);
  res.status(200).json(comment);
});

// post routes
postRouter.route("/").post(protect, createPost).get(getPosts);
postRouter.route("/:postID").get(getPost).put(updatePost).delete(deletePost);

// post like routes
postRouter.route("/:postID/like").post(protect, likePost);

// post comment routes
postRouter.route("/:postID/comment").post(protect, addComment);
postRouter.route("/:postID/comments").get(getComments);

module.exports = postRouter;
