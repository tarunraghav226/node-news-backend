const express = require("express");

const apiRouter = express.Router();
const healthCheck = require("./endpoints/healthCheck");
const userRouter = require("./endpoints/user");

apiRouter.use("/user", userRouter);

apiRouter.route("/health-check").get(healthCheck);

module.exports = apiRouter;
