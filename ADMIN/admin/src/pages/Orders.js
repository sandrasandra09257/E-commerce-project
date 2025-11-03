import React, { useEffect, useState } from "react";
import axios from "axios";


function Orders({token}) {
    
const backend_url = process.env.REACT_APP_BACKEND_URL;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/order/list-order`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Order list:", response.data);
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, [token]);

  if (loading) return <div className="text-center mt-20">Loading orders...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Orders</h2>

      {orders.length === 0 ? (
        <div className="text-gray-500 text-center mt-12">No orders found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                  Order ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                  User
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                  Amount (₹)
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                  Payment Method
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4 border-b text-sm text-gray-700">
                    {order._id}
                  </td>
                  <td className="py-3 px-4 border-b text-sm text-gray-700">
                    {order.address?.name || "N/A"}
                    <br />
                    <span className="text-xs text-gray-500">
                      {order.address?.email}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b text-sm text-gray-700">
                    ₹{order.amount}
                  </td>
                  <td className="py-3 px-4 border-b text-sm text-gray-700">
                    {order.paymentMethod}
                  </td>
                  <td className="py-3 px-4 border-b text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status || "Order Placed"}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b text-sm text-gray-700">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;