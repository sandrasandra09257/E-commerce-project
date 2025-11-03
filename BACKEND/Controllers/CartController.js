// backend/Controllers/cartController.js
const Cart = require("../Models/cartModel");
const Product = require("../Models/productModel");




exports.addToCart = async (req, res) => {
  try {
    console.log("🧾 req.body:", req.body);
    const {productId, size, quantity } = req.body;
    const userId = req.user.id; 
    const qty = Number(quantity) || 1;

    // 🧠 Step 1: Basic validation
    if (!userId || !productId || !size || !qty) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // 🧠 Step 2: Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // 🧠 Step 3: Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // 🧠 Step 4: Check if item already exists
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.items.push({ productId, size, quantity: qty });
    }

    // 🧠 Step 5: Save
    await cart.save();

    res.status(200).json({ success: true, message: "Product added to cart", cart });
  } catch (error) {
    console.error("🛑 Cart Add Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// 🧺 Get Cart
exports.getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✏️ Update quantity
exports.updateCart = async (req, res) => {
  try {
    const { userId, productId, size, quantity } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ success: false, message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId && item.size === size
    );
    if (item) item.quantity = quantity;

    await cart.save();
    res.json({ success: true, message: "Cart updated", cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ❌ Remove from cart
exports.removeCartItem = async (req, res) => {
  try {
    const { userId, productId, size } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => !(item.productId.toString() === productId && item.size === size)
    );

    await cart.save();
    res.json({ success: true, message: "Item removed", cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
