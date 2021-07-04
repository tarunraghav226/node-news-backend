const jwt = require("jsonwebtoken");

exports.signToken = (userID) =>
  jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRE_IN,
  });

exports.verifyToken = async (token) => {
  const data = {
    userID: null,
    err: null,
  };
  await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      data.err = err;
    } else {
      data.userID = decoded.userID;
    }
  });
  return data;
};
