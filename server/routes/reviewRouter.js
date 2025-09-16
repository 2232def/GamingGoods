const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.post("/createReview", reviewController.createReview);

router.get("/product/:productId", reviewController.getProductReviews); 

router.put("/:reviewId", reviewController.updateReview);

router.delete("/:reviewId", reviewController.deleteReview);

module.exports = router;