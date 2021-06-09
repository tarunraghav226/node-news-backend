const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = express();

app.use(morgan("dev"));
app.use(express.json());

const port = 3000;

app.listen(port, () => {
  console.log("SERVER IS RUNNING");
});
