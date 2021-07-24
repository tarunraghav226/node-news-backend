const uuid = require("uuid");
const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  imageID: {
    type: String,
    default: uuid.v4,
    unique: true,
  },
  imageURL: {
    type: String,
    required: [true, "Image URL is required"],
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
