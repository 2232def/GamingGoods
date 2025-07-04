const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/addtocart", cartController.addToCart);

router.get("/cart/:userId", cartController.getCart);

router.delete("/cart/:userId/:productId", cartController.removeCart);

module.exports = router;
