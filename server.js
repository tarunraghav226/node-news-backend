const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./.env" });

const port = 3000;

app.listen(port, () => {
  console.log("SERVER IS RUNNING");
});
