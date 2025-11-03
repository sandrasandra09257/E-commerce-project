import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../Components/Context/ShopContext";
import { toast } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { products } = useContext(ShopContext);

  const backend_url = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || user?.id;

  // ✅ Fetch user orders
  const getUserOrders = async () => {
    try {
      const response = await axios.get(
        `${backend_url}/api/order/get-userorder/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } } // ✅ FIXED
      );

      if (response.data.success && response.data.orders?.length > 0) {
        setOrders(response.data.orders.reverse());
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("❌ Error fetching orders:", error.response?.data || error.message);
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    if (userId && token) getUserOrders();
  }, [userId, token]);

  // 🩶 If no orders
  if (orders.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-600 text-lg">
        No orders yet
      </div>
    );
  }

  // ✅ Render orders
  return (
    <div className="ml-20 mr-20 mt-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Orders</h2>

      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-3 border border-gray-300 rounded-2xl p-6 shadow-sm"
          >
            {/* 🟢 COLUMN 1: Product Details */}
            <div className="flex flex-col gap-4">
              {order.items.map((item, i) => {
                const product = products.find((p) => p._id === item.productId);
                if (!product) return null;

                return (
                  <div
                    key={i}
                    className="flex gap-4 items-center border-b border-gray-200 pb-3"
                  >
                    <img
                      src={product.image1 || product.image}
                      alt={product.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Price: ₹{product.price}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Size: {item.size}
                      </p>
                    </div>
                  </div>
                );
              })}

              <p className="font-semibold mt-2 text-gray-800">
                Total: ₹{order.amount}
              </p>
            </div>

            {/* 🟠 COLUMN 2: Order Status */}
            <div className="flex flex-col justify-center items-center text-center">
              <p
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Processing"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {order.status || "Order Placed"}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Payment: {order.paymentMethod}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt || order.date).toLocaleDateString()}
              </p>
            </div>

          
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
