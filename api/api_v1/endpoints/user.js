/* eslint-disable node/no-unsupported-features/es-syntax */
const express = require("express");
const catchAsync = require("../../../utils/catchAsync");
const User = require("../../../models/user");

const userRouter = express.Router();

const userSignUp = catchAsync(async (req, res, next) => {
  /*
      #swagger.start
      #swagger.path = '/api/v1/user/signup'
      #swagger.method = 'post'
      #swagger.description = 'Create User'
      #swagger.produces = ['application/json']
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Adding new user.',
                schema: {
                    $userName: 'string',
                    $password: 'string',
                    $confirmPassword: 'string',
                    $firstName: 'string',
                    $lastName: 'string'
                }
            }
      #swagger.end
  */
  const user = await User.create({
    userName: req.body.userName,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  res.status(200).json({
    ...user._doc,
  });
});

userRouter.route("/signup").post(userSignUp);

module.exports = userRouter;
