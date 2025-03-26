const express = require("express");
const router = express.Router();
const product = require("../models/product-model");

const productController = require("../controllers/productController");
const upload = require("../middlewares/upload");

router.post('/products', upload.single('image'), productController.createProduct);

router.get('/products_get', productController.getProducts);

router.delete('/products_delete/:id', productController.deleteProduct);

router.put("/products_edit/:id", upload.single("image"), productController.updateProduct);

router.get("/products_get/:id", productController.getProductById);


module.exports = router;
