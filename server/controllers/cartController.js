const cartSchema = require("../models/cart-model");

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, name, price, quantity } = req.body;

    let cart = await cartSchema.findById({ userId });
    if (!cart) {
      cart = await cartSchema.create({ userId, items: [] });
    }
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity; // Increment quantity if item already exists
    } else {
      cart.items.push({ productId, name, price, quantity }); // Add new item to cart
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await cartSchema
      .findOne({ userId: req.params.userId })
      .populate("items.productId", "name price");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await cartSchema.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const itemExists = cart.items.some(
      (item) => item.productId.toString() === productId
    );
    if (!itemExists) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();

    res.json({ message: "Item removed from cart successfully", cart: cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
