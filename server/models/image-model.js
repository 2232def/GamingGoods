const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  size: Number,
  imageData: Buffer,
});

module.exports = mongoose.model("Image", ImageSchema);
