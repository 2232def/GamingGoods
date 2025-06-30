const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateTokenOwner } = require("../utils/generateToken");
// const { isLoggedIn } = require("../middlewares/isLoggedIn");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    try {
      let owners = await ownerModel.find();
      // if (owners.length > 0) {
      //   return res
      //     .status(503)
      //     .send("You don't have permission to create a new owner.");
      // }

      let { fullname, email, password, gstin } = req.body;
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) return res.send(err.message);
          else {
            let createdOwner = await ownerModel.create({
              fullname,
              email,
              password: hash,
              gstin,
            });
            let token = generateTokenOwner(createdOwner);
            res.cookie("token", token);
            return res
              .status(201)
              .json({ message: "Owner created successfully" });
          }
        });
      });
    } catch (err) {
      return res.send(err.message);
    }
  });

  router.post("/login", async function (req, res) {
    try {
      let { email, password } = req.body;

      let owner = await ownerModel.findOne({ email: email });
      if (!owner) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      bcrypt.compare(password, owner.password, function (err, result) {
        if (result) {
          let token = generateTokenOwner(owner);
          res.cookie("token", token);
          return res
            .status(201)
            .json({ message: "Owner created successfully" });
        } else {
          return res.status(401).json({ message: "Invalid email or password" });
        }
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
}

router.get("/profile", async (req, res) => {
  try {
    // Fetch the first owner document in the collection
    const owner = await ownerModel.findOne();
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.json({ owner });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
