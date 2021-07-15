const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public");
  },
  filename: function (req, file, callback) {
    callback(null, `user/${req.user[0].userID}/${file.filename}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
