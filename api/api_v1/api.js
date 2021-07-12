const express = require("express");

const apiRouter = express.Router();
const healthCheck = require("./endpoints/healthCheck");
const userRouter = require("./endpoints/user");
const postRouter = require("./endpoints/post");

apiRouter.use("/user", userRouter);
apiRouter.use("/post", postRouter);

apiRouter.route("/health-check").get(healthCheck);

module.exports = apiRouter;
