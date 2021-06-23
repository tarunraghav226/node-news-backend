const mongoose = require("mongoose");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: [true, "Please enter username."],
  },
  password: {
    type: String,
    required: [true, "Please provide password."],
    select: false,
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

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

UserSchema.methods.correctPassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
