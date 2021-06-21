/* eslint-disable node/no-unsupported-features/es-syntax */
const express = require("express");
const catchAsync = require("../../../utils/catchAsync");
const User = require("../../../models/user");
const AppError = require("../../../utils/appError");

const userRouter = express.Router();

const userSignUp = catchAsync(async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword)
    next(new AppError("Password and confirm password must be same", 400));

  const user = await User.create({
    userName: req.body.userName,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  user.password = undefined;
  res.status(200).json({
    user,
  });
});

userRouter.route("/signup").post(userSignUp);

module.exports = userRouter;
