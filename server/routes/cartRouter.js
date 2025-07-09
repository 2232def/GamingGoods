const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/addtocart", cartController.addToCart);

router.get("/cart/:userId", cartController.getCart);

router.delete("/cart/:userId/:productId", cartController.removeCart);

router.put("/cart/update", cartController.updateCartItem);

router.delete("/cart/clear",cartController.cleanCart);

router.post("/cart/batch", cartController.batchAddToCart);


module.exports = router;
