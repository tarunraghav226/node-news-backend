const catchAsync = require("../../../utils/catchAsync");

const healthCheck = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: "OK",
  });
});

module.exports = healthCheck;
