const { app } = require("./app");

app.get("/users/:id", (req, res) => {
  const { filtro } = req.query;

  return res.status(404).send(false);
});
