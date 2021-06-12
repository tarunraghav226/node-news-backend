module.exports = (err, req, res, next) => {
  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
  });
};
