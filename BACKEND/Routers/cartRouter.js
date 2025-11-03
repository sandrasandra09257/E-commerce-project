// backend/Routers/cartRouter.js
const express = require("express");
const {
  addToCart,
  getUserCart,
  updateCart,
  removeCartItem,
} = require("../Controllers/cartController");
const authUser = require("../Middleware/auth");

const router = express.Router();

// Routes
router.post("/add-cart", authUser, addToCart);
router.post("/get-cart", authUser, getUserCart);
router.post("/update-cart", authUser, updateCart);
router.post("/remove-cart", authUser, removeCartItem);

module.exports = router;
