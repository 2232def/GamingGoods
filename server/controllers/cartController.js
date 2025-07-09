const cartSchema = require("../models/cart-model");

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, name, price, quantity } = req.body;

    let cart = await cartSchema.findOne({ userId });
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
    await cart.save();
    res.status(201).json({
      message: "Item added to cart successfully",
      cart: cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await cartSchema.findOne({ userId: req.params.userId });
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

exports.updateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await cartSchema.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    res.json({
      message: "Cart item updated successfully",
      cart: cart,
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.cleanCart = async (req, res) => {
  try {
    const { userId } = req.body;

    let cart = await cartSchema.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleaned successfully", cart: cart });
  } catch (error) {
    console.error("Error cleaning cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.batchAddToCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "Items must be an array" });
    }

    let cart = await cartSchema.findOne({ userId });

    if (!cart) {
      cart = await cartSchema.create({ userId, items: [] });
    }

    for (const item of items) {
      const { productId, name, price, quantity } = item;

      const existingItem = cart.items.find(
        (cartItem) => cartItem.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, name, price, quantity });
      }
    }

    await cart.save();
    res.status(201).json({
      message: "Items added to cart successfully",
      cart: cart,
    });
  } catch (error) {
    console.error("Error adding items to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
