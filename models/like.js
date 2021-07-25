const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  userID: {
    type: String,
    ref: "User",
    required: [true, "User required to like post"],
  },
  postID: {
    type: String,
    ref: "Post",
    required: [true, "Post required to like"],
  },
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
