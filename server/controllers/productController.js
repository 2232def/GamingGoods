const Product = require("../models/product-model");
const jwt = require("jsonwebtoken");
const Owner = require("../models/owner-model");

exports.createProduct = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Invalid token" });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    
    const ownerId = decoded.id || decoded._id || decoded.userID;


    // res.json({decoded})
    if (!ownerId) {
      return res.status(401).json({ error: "Owner ID not provided" });
    }

    const owner = await Owner.findById(ownerId);

    if (!owner) {
      return res.status(401).json({ error: "Invalid owner ID or owner not found" });
    }

    let imageData = null;
    if (req.file) {
      imageData = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const productData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount || 0,
      ownerID: owner._id,
      image: imageData,
      createdAt: req.body.createdAt || Date.now(),
    };

    const product = await Product.create(productData);

    // Update the owner's products array (if desired)
    owner.products.push(product._id);
    await owner.save();

    return res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Attempting to delete product with id:", id);

    const deletedProduct = await Product.findByIdAndDelete(id);
    console.log("Deleted product:", deletedProduct);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    const owner = await Owner.findByIdAndUpdate(deletedProduct.ownerID, {
      $pull: { products: deletedProduct._id },
    });
    if (!owner) {
      return res.status(200).json({ message: "Product deleted successfully" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let imageData = null;
    if (req.file) {
      imageData = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount || 0,
      image: imageData,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    // Retrieve owner ID
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Invalid token" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const ownerId = decoded.id;

    if (!ownerId) {
      return res.status(401).json({ error: "Owner ID not provided" });
    }

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(401).json({ error: "Invalid owner ID" });
    }

    const products = await Product.find({ ownerID: owner._id });
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ error: error.message });
  }
};



