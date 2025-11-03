const Order = require("../Models/orderModel");

/**
 * 📦 PLACE A NEW ORDER
 */
exports.placeOrder = async (req, res) => {
  try {
    let { userId, items, amount, address, paymentMethod, productId, size, quantity } = req.body;

    // 🧩 Handle single product order
    if (!items && productId) {
      items = [
        {
          productId,
          size: size || "N/A",
          quantity: quantity || 1,
        },
      ];
    }

    // 🧩 Validation
    if (!userId || !items?.length || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields (userId, items/productId, amount, address) are required",
      });
    }

    // 🧩 Create and save order
    const newOrder = new Order({
      userId,
      items,
      amount,
      address,
      paymentMethod: paymentMethod || "COD",
      payment: false,
      status: "Processing",
      date: new Date(),
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "✅ Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * 👤 GET ORDERS FOR A SPECIFIC USER
 */
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).sort({ date: -1 }); // ✅ fixed

    res.json({ success: true, orders });
  } catch (error) {
    console.error("❌ Error in getUserOrders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

/**
 * 🧾 ADMIN — LIST ALL ORDERS
 */
exports.listAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * ❌ DELETE ORDER (ADMIN)
 */
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.findByIdAndDelete(orderId);
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
