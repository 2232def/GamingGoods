const Review = require("../models/review-model");
const User = require("../models/user-model");
const Product = require("../models/product-model");

module.exports.createReview = async (req, res) => {
  try {
    const userId =
      req.user?._id?.toString() || req.body.userId || req.body.user;

    const productId =
      req.params.productId || req.body.productId || req.body.product;

    const { rating, title, comment, images } = req.body;

    console.log(userId);

    const existingReview = await Review.findOne({
      user: userId,
      product: productId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    console.log("Request body:", req.body);
    console.log("userId:", userId);
    console.log("productId:", productId);

    // Validate required fields
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId is required",
      });
    }

    const user = await User.findById(userId);
    // const hasPurchased = user.orders.some(
    //   (order) =>
    //     order.products &&
    //     order.products.some((p) => p.productId.toString() === productId)
    // );

    const newReview = {
      user: userId,
      product: productId,
      rating,
      title,
      comment,
      images: images || [],
      // verified: hasPurchased,
    };

    const review = await Review.create(newReview);
    user.reviews.push(review._id);

    await user.save();
    const populatedReview = await Review.findById(review._id)
      .populate("user", "fullname picture")
      .populate("product", "title");

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: populatedReview,
    });
  } catch (err) {
    console.error("Create review error: ", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const pageNum = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limitNum = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const sortKey = (req.query.sort || "newest").toLowerCase();
    let sortMap = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      highest: { rating: -1, createdAt: -1 },
      lowest: { rating: 1, createdAt: 1 },
      helpful: { helpful: -1, createdAt: -1 },
    };

    const sortOption = sortMap[sortKey] || sortMap.newest;

    const reviews = await Review.find({ product: productId })
      .populate("user", "fullname picture")
      .sort(sortOption)
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum);

    const totalReviews = await Review.countDocuments({ product: productId });

    const totalPages = Math.max(1, Math.ceil(totalReviews / limitNum));
    res.status(200).json({
      success: true,
      data: {
        reviews,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalReviews,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1,
        },
      },
    });
  } catch (err) {
    console.error("Get product reviews error: ", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, title, comment, images } = req.body;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own reviews",
      });
    }

    review.rating = rating || review.rating;
    review.title = title || review.title;
    review.comment = comment || review.comment;
    review.images = images || review.images;
    review.updatedAt = new Date();

    await review.save();

    const updateReview = await Review.findById(reviewId)
      .populate("user", "fullname picture")
      .populate("product", "title");

    res.status(200).json({
      success: true,
      message: "review updated successfully",
      data: updateReview,
    });
  } catch (err) {
    console.error("Update review error: ", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
