const express = require("express");

const upload = require("../../dependencies/imageHandler");
const catchAsync = require("../../../utils/catchAsync");
const { protect } = require("../../dependencies/authHandler");
const Image = require("../../../models/image");

const imageRouter = express.Router();

const uploadImage = catchAsync(async (req, res, next) => {
  const image = await Image.create({
    imageURL: process.env.API_V1_HOST_NAME + req.file.filename,
  });
  res.status(200).json(image);
});

const deleteImage = catchAsync(async (req, res, next) => {
  const { imageID } = req.params;
  await Image.findOneAndUpdate({ imageID }, { is_deleted: true });
  res.status(200).json({
    message: "Image Deleted",
  });
});

imageRouter.route("/").post(protect, upload.single("image"), uploadImage);
imageRouter.route("/:imageID").delete(deleteImage);

module.exports = imageRouter;
