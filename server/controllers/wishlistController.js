const wishlistSchema = require("../models/wishlist-model");

exports.addToWishlist = async (req, res) => {
  try {
    const { userId, productId, name, price } = req.body;

    let wishlist = await wishlistSchema.findOne({ userId });
    if (!wishlist) {
      wishlist = await wishlistSchema.create({ userId, items: [] });
    }

    const existingItem = wishlist.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      return res.status(400).json({ message: "Item already in wishlist" });
    }

    wishlist.items.push({ productId, name, price });
    await wishlist.save();

    res.status(201).json({
      message: "Item added to wishlist successfully",
      wishlist: wishlist,
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistSchema.findOne({
      userId: req.params.userId,
    });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.json(wishlist);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeWishlistItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let wishlist = await wishlistSchema.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    const itemExists = wishlist.items.some(
      (item) => item.productId.toString() === productId
    );
    if (!itemExists) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await wishlist.save();

    res.json({
      message: "Item removed from wishlist successfully",
      wishlist: wishlist,
    });
  } catch (error) {
    console.error("Error removing wishlist item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.clearWishlist = async (req, res) => {
  try {
    const { userId } = req.body;

    let wishlist = await wishlistSchema.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.items = [];
    await wishlist.save();

    res.json({
      message: "Wishlist cleared successfully",
      wishlist: wishlist,
    });
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
