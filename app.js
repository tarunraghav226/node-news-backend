const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const errorHandler = require("./api/dependencies/errorHandler");
const swaggerFile = require("./swagger_output.json");

const apiRouter = require("./api/api_v1/api");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
swaggerFile.host = "127.0.0.1:3000";
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/api/v1/", apiRouter);
app.use(errorHandler);

module.exports = app;
