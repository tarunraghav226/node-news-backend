/* eslint-disable node/no-unsupported-features/es-syntax */
const express = require("express");
const { signToken } = require("../../../core/security");

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

const userLogin = catchAsync(async (req, res, next) => {
  const { userName, password } = req.body;

  if (!userName || !password)
    next(new AppError("Username and password are required", 400));

  const user = await User.findOne({ userName }).select("+password");

  if (!user || !user.correctPassword(password, user.password))
    next(new AppError("Username or password is incorrect", 400));

  const accessToken = signToken(user.userID);

  res.status(200).json({
    status: "success",
    accessToken,
  });
});

//Router handlers
userRouter.route("/signup").post(userSignUp);
userRouter.post("/login", userLogin);

module.exports = userRouter;
