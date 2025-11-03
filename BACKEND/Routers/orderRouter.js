const express = require("express");
const auth = require("../Middleware/auth");
const {
  placeOrder,
  listAllOrders,
  getUserOrders,
  deleteOrder,
} = require("../Controllers/orderController");

const orderRouter = express.Router();

orderRouter.post("/place-order", auth, placeOrder);
orderRouter.get("/list-order", auth, listAllOrders);
orderRouter.get("/get-userorder/:userId", auth, getUserOrders);
orderRouter.delete("/delete/:orderId", auth, deleteOrder);

module.exports = orderRouter;
