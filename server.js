const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./.env" });

const DB_URI = process.env.DB_URI.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
);

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("CONNECTED TO DATABASE");
  })
  .catch(() => {
    console.log("CANNOT CONNECT TO DATABASE");
  });

const port = 3000;

app.listen(port, () => {
  console.log("SERVER IS RUNNING");
});
