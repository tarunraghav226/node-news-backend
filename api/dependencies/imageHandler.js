const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (!fs.existsSync("./uploads/"))
      fs.mkdirSync("./uploads/", { recursive: true });
    callback(null, "uploads");
  },
  filename: function (req, file, callback) {
    callback(null, `${file.fieldname}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
