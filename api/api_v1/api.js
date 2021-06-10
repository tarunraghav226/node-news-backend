const express = require("express");

const apiRouter = express.Router();
const healthCheck = require("./endpoints/healthCheck");

apiRouter.route("/health-check").get(healthCheck);

module.exports = apiRouter;
