const express = require("express");
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const upload = require("../../dependencies/imageHandler");
const catchAsync = require("../../../utils/catchAsync");
const { protect } = require("../../dependencies/authHandler");
const Image = require("../../../models/image");

const imageRouter = express.Router();

const uploadImage = catchAsync(async (req, res, next) => {
  const s3 = new S3({
    bucketRegion: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  const fileStream = fs.createReadStream(req.file.path);

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fileStream,
    Key: req.file.filename,
    ContentDisposition: "inline",
    ContentType: req.file.mimetype,
  };
  const awsRes = await s3.upload(uploadParams).promise();

  const image = await Image.create({
    imageURL: awsRes.Location,
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
