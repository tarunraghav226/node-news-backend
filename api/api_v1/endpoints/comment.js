const express = require("express");
const catchAsync = require("../../../utils/catchAsync");
const Comment = require("../../../models/comment");
const AppError = require("../../../utils/appError");
const { protect } = require("../../dependencies/authHandler");

const commentRouter = express.Router();

const updateComment = catchAsync(async (req, res, next) => {
  const { userID } = req.user[0];
  const { commentID } = req.params;
  const comment = await Comment.findById(commentID);

  if (comment.userID != userID) {
    next(new AppError("User not allowed to perform this action"), 400);
  }
  await Comment.findByIdAndUpdate(commentID, {
    comment: req.body.comment,
  });
  res.sendStatus(200);
});

commentRouter.route("/:commentID").put(protect, updateComment);

module.exports = commentRouter;
