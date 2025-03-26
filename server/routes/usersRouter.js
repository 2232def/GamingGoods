const express = require("express");
const router = express.Router();
const {registerUser, loginUser} = require("../controllers/authController");
const jwt = require("jsonwebtoken");


router.get("/", function (req, res) {
  res.send("hey it's working");
});

router.post("/register", registerUser);

router.post("/login", loginUser )

module.exports = router;
