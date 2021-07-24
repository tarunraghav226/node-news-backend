const express = require("express");

const apiRouter = express.Router();
const healthCheck = require("./endpoints/healthCheck");
const userRouter = require("./endpoints/user");
const postRouter = require("./endpoints/post");
const imageRouter = require("./endpoints/image");

apiRouter.use("/user", userRouter);
apiRouter.use("/post", postRouter);
apiRouter.use("/image", imageRouter);

apiRouter.route("/health-check").get(healthCheck);

module.exports = apiRouter;
