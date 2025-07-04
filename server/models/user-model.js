const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Cart",
    default: null,
  },
  orders: {
    type: Array,
    default: [],
  },
  wishlist: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String,
});

module.exports = mongoose.model("User", userSchema);
