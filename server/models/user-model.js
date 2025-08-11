const mongoose = require("mongoose");
// const { default: Reviews } = require("../../client/src/components/Reviews");

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Cart",
      default: [],
    },
  ],
  orders: {
    type: Array,
    default: [],
  },
  wishlist: {
    type: Array,
    default: [],
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      default: [],
    },
  ],
  contact: Number,
  picture: String,
});

module.exports = mongoose.model("User", userSchema);
