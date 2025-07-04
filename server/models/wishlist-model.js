const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/database");

const wishlistSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("wishlist", wishlistSchema);
