const jwt = require("jsonwebtoken");

exports.signToken = (userID) =>
  jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRE_IN,
  });
