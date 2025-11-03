import React, { useState, useContext } from "react";
import profile from "../Assets/Images/profile-icon.png";
import vector from "../Assets/Images/Vector.png";
import { NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../Components/Context/ShopContext";

function Header() {
  const [dropDown, setDropDown] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const { cartItems, products, removeCartItems, getCartAmount, backend_url } = useContext(ShopContext);

  // 🧮 Count total items
  const cartCount = Object.values(cartItems || {}).reduce((total, item) => {
    if (typeof item === "object") {
      return (
        total +
        Object.values(item).reduce((sum, qty) => sum + (qty || 0), 0)
      );
    }
    return total + (item || 0);
  }, 0);

  // 🧾 Build cart list
  const cartList = Object.entries(cartItems).flatMap(([productId, sizes]) => {
    const product = products.find((p) => p._id === productId);
    if (!product) return [];
    return Object.entries(sizes).map(([size, quantity]) => ({
      ...product,
      size,
      quantity,
    }));
  });

  return (
    <header className="relative w-full px-6 lg:px-12 py-4 flex items-center justify-between bg-white shadow-md z-40">
      {/* 🌾 Logo */}
      <div
        onClick={() => navigate("/")}
        className="font-logo text-2xl font-semibold text-gray-800 tracking-widest uppercase cursor-pointer"
      >
        FOREVER<span className="text-pink-500">•</span>
      </div>

      {/* 🧭 Navigation */}
      <nav className="hidden md:flex space-x-8 text-lg font-medium">
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/Collection">COLLECTION</NavLink>
        <NavLink to="/About">ABOUT</NavLink>
        <NavLink to="/Contact">CONTACT</NavLink>
      </nav>

      {/* ⚙️ Right Side */}
      <div className="flex items-center space-x-6 relative">
        {/* 👤 Profile */}
        {token ? (
          <div className="relative">
            <img
              src={profile}
              alt="Profile"
              className="h-6 w-6 cursor-pointer"
              onClick={() => setDropDown((prev) => !prev)}
            />
            {dropDown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                <button
                  onClick={() => navigate("/Myorder")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Orders
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login">
            <img src={profile} alt="Profile" className="h-6 w-6" />
          </NavLink>
        )}

        {/* 🛒 Cart */}
        <div className="relative">
          <img
            src={vector}
            alt="Cart"
            className="w-6 h-6 cursor-pointer"
            onClick={() => setCartOpen((prev) => !prev)}
          />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}

          {/* 🧾 Dropdown */}
          {cartOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white border rounded-lg shadow-lg p-4 z-50">
              <button
                onClick={() => setCartOpen(false)}
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
              >
                ❌
              </button>
              <h3 className="font-semibold mb-2">Your Cart</h3>

              {cartList.length === 0 ? (
                <p className="text-gray-500 text-sm">Your cart is empty.</p>
              ) : (
                <div className="max-h-60 overflow-y-auto space-y-3">
                  {cartList.map((item) => (
                    <div
                      key={`${item._id}-${item.size}`}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <img
                        src={
                          item.image?.[0]?.startsWith("http")
                            ? item.image[0]
                            : `${backend_url}/${item.image?.[0]}`
                        }
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 ml-2">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Size: {item.size} | Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold">₹{item.price}</p>
                      </div>
                      <button
                        onClick={() => removeCartItems(item._id, item.size)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {cartList.length > 0 && (
                <div className="mt-3 border-t pt-2">
                  <p className="text-right font-semibold">
                    Total: ₹{getCartAmount()}
                  </p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      navigate("/Cart");
                    }}
                    className="w-full bg-green-600 text-white py-2 rounded-md mt-3 hover:bg-green-700"
                  >
                    Go to Cart
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
