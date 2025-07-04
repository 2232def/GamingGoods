const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/database");

const productSchema = mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
  title: String,
  price: Number,
  description: String,
  discount: {
    type: Number,
    default: 0,
  },
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "owner",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("product", productSchema);
