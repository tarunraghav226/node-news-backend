const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./api/dependencies/errorHandler");

const apiRouter = require("./api/api_v1/api");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/", apiRouter);
app.use(errorHandler);

module.exports = app;
