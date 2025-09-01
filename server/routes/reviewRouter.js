const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.post("/createReview", reviewController.createReview);
router.get("/product/:productId", reviewController.getProductReviews);  

module.exports = router;