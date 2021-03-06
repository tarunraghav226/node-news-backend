const mongoose = require("mongoose");
const uuid = require("uuid");

const PostSchema = new mongoose.Schema({
  owner: {
    type: String,
    ref: "User",
    required: [true, "Post owner is required"],
  },
  title: {
    type: String,
    required: [true, "Title is requried"],
  },
  summary: {
    type: String,
    required: [true, "Summary is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  postID: {
    type: String,
    unique: true,
    default: uuid.v4,
  },
  coverImageURL: {
    type: String,
    default: null,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
