import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../Components/Context/ShopContext";

const Delivery = () => {
  const { getCartAmount, delivery_fee, cartItems, products } = useContext(ShopContext);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash on delivery");

  const subTotal = Number(getCartAmount()) || 0;
  const shippingFee = subTotal > 0 ? Number(delivery_fee) : 0;
  const total = subTotal + shippingFee;

  // 🧩 Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🧾 Create order data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      toast.error("Please login before placing an order.");
      return;
    }

    // ✅ Build address
    const address = {
      name: formData.name,
      email: formData.email,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
      phone: formData.phone,
    };

    // ✅ Build items array from cart
    // ✅ Build items array from cart correctly
const items = Object.entries(cartItems)
  .flatMap(([productId, sizes]) =>
    Object.entries(sizes).map(([size, quantity]) => ({
      productId,
      size,
      quantity,
    }))
  );


    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderData = {
      userId: user._id,
      items,
      amount: total,
      address,
      paymentMethod,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/order/place-order",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("✅ Order placed successfully!");
        navigate("/Myorder");
      } else {
        toast.error(response.data.message || "❌ Failed to place order");
      }
    } catch (error) {
      console.error("Add Order Error:", error);
      toast.error("❌ Failed to place order. Please try again.");
    }
  };

  // 💳 Payment logos
  const PaymentLogo = ({ method }) => {
    if (method === "stripe")
      return <span className="text-blue-600 font-bold">Stripe</span>;
    if (method === "razorpay")
      return <span className="text-green-600 font-bold">Razorpay</span>;
    return <span className="text-gray-600">Cash on Delivery</span>;
  };

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 bg-white">
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-16">
        {/* LEFT COLUMN */}
        <div>
          <h2 className="text-xl font-normal uppercase tracking-wider mb-8 pb-2">
            <span className="text-gray-500">Delivery</span> Information
          </h2>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 focus:border-gray-900 focus:ring-0 text-sm"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full mt-4 p-3 border border-gray-300 focus:border-gray-900 text-sm"
            required
          />

          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            placeholder="Street Address"
            className="w-full mt-4 p-3 border border-gray-300 focus:border-gray-900 text-sm"
            required
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className="p-3 border border-gray-300 focus:border-gray-900 text-sm"
              required
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State"
              className="p-3 border border-gray-300 focus:border-gray-900 text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="Zip Code"
              className="p-3 border border-gray-300 focus:border-gray-900 text-sm"
              required
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Country"
              className="p-3 border border-gray-300 focus:border-gray-900 text-sm"
              required
            />
          </div>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="w-full mt-4 p-3 border border-gray-300 focus:border-gray-900 text-sm"
            required
          />
        </div>

        {/* RIGHT COLUMN */}
        <div>
          <h2 className="text-xl font-normal uppercase tracking-wider mb-8 mt-10 pb-2">
            Cart Totals
          </h2>

          <div className="space-y-3 mb-10 text-gray-700 text-sm">
            <div>
              Subtotal <span className="float-right">${subTotal.toFixed(2)}</span>
            </div>
            <div>
              Shipping Fee <span className="float-right">${shippingFee.toFixed(2)}</span>
            </div>
            <div className="font-semibold text-xl">
              Total <span className="float-right">${total.toFixed(2)}</span>
            </div>
          </div>

          <h2 className="text-xl font-normal uppercase tracking-wider mb-8 pb-2">
            Payment Method
          </h2>

          <div className="flex flex-wrap gap-3">
            {["stripe", "razorpay", "cash on delivery"].map((method) => (
              <label
                key={method}
                className={`flex items-center space-x-2 p-3 border rounded-sm cursor-pointer transition ${
                  paymentMethod === method
                    ? "border-gray-900 ring-1 ring-gray-900"
                    : "border-gray-300 hover:border-gray-500"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                />
                <PaymentLogo method={method} />
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-black text-white py-3 text-sm tracking-wider hover:bg-gray-800 transition"
          >
            PLACE ORDER
          </button>
        </div>
      </form>
    </section>
  );
};

export default Delivery;
