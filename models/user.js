const mongoose = require("mongoose");
const uuid = require("uuid");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: [true, "Please enter username."],
  },
  password: {
    type: String,
    required: [true, "Please provide password."],
  },
  confirmPassword: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, "Users firstname is required"],
  },
  lastName: {
    type: String,
    required: [true, "Users lastname is required"],
  },
  userID: {
    type: String,
    unique: true,
    default: uuid.v4,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
