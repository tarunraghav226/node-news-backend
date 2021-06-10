const healthCheck = (req, res, next) => {
  res.send(200).json({
    status: "success",
    message: "ok",
  });
};

module.exports = healthCheck;
