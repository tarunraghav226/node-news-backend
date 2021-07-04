const User = require("../../models/user");
const { verifyToken } = require("../../core/security");

exports.protect = async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  const data = await verifyToken(token);
  if (data.err) next(data.err);
  const loggedInUser = await User.find({ userID: data.userID });
  req.user = loggedInUser;
  next();
};
