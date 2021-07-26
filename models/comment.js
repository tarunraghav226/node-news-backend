const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    postID: {
      type: String,
      ref: "Post",
      required: [true, "Post required to add comment"],
    },
    userID: {
      type: String,
      ref: "User",
      required: [true, "User required to add comment"],
    },
    comment: {
      type: String,
      requried: [true, "Comment is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
