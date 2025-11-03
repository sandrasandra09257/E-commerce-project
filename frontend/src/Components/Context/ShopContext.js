import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const backend_url = "http://localhost:4000";

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const delivery_fee = 10;
  const placeOrder = async (address, paymentMethod = "COD") => {
  if (!user?._id || !token) {
    toast.error("Please log in before placing an order");
    return;
  }

  try {
    // Prepare cart items
    const items = Object.entries(cartItems).flatMap(([productId, sizes]) =>
      Object.entries(sizes).map(([size, quantity]) => ({
        productId,
        size,
        quantity,
      }))
    );

    const orderData = {
      userId: user._id,
      items,
      amount: getCartAmount(),
      address,
      paymentMethod,
    };

    console.log("🟢 Sending order data:", orderData);

    const response = await axios.post(
      `${backend_url}/api/order/place-order`,
      orderData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data.success) {
      toast.success("✅ Order placed successfully!");
    } else {
      toast.error(response.data.message || "Failed to place order");
    }
  } catch (error) {
    console.error("❌ Place order error:", error.response?.data || error.message);
    toast.error("Order failed. Please try again.");
  }
};


  // ✅ Fetch all products
  const getProductData = async () => {
    try {
      const response = await axios.get(`${backend_url}/product/list`,
        { headers: { Authorization: `Bearer ${token}` } }

      );
      console.log("🟢 Product list response:", response.data);

      if (response.data.success) {
        const productArray =
          response.data.products ||
          response.data.allProducts ||
          response.data.getAllProducts ||
          [];
        setProducts([...productArray].reverse());
      } else {
        toast.error(response.data.message || "Failed to load products");
      }
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  // ✅ Add to cart
  const addToCart = async (itemId, size) => {
  if (!token) {
    toast.error("Please log in before adding to cart");
    return;
  }

  if (!size) {
    toast.error("Please select a size before adding to cart");
    return;
  }

  console.log("🧠 Add to Cart Debug:", { userId: user?._id, productId: itemId, size });

  const selected = products.find((product) => product._id === itemId);
  setSelectedProduct(selected);

  // ✅ Update UI only after token check
  const updatedCart = structuredClone(cartItems);
  if (!updatedCart[itemId]) updatedCart[itemId] = {};
  updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;
  setCartItems(updatedCart);

  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?._id;

    if (!userId) {
      toast.error("Please log in before adding to cart");
      return;
    }

    console.log("🟢 Sending to backend:", { userId, productId: itemId, size, quantity: 1 });

    const response = await axios.post(
      `${backend_url}/cart/add-cart`,
      { productId: itemId, size, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data.success) {
      toast.success("✅ Product added to cart");
    } else {
      toast.error(response.data.message || "Failed to add item to cart");
    }
  } catch (error) {
    console.error("❌ Add to cart error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to add item to cart");
  }
};

  // ✅ Get user cart
  const getUserCart = async () => {
    if (!user?._id) return;
    try {
      const response = await axios.post(
        `${backend_url}/cart/get-cart`,
        { userId: user._id },
        { headers: { Authorization: `Bearer ${token}` } }

      );
      if (response.data.success) {
        setCartItems(response.data.cart?.items || {});
      } else {
        toast.error(response.data.message || "Could not load cart");
      }
    } catch (error) {
      console.error("❌ Get cart error:", error);
      toast.error("Could not load cart");
    }
  };

  // ✅ Update quantity
  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = quantity;
      setCartItems(cartData);
    }

    if (token) {
      try {
        await axios.post(
          `${backend_url}/cart/update-cart`,
          { userId: user?._id, productId: itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }

        );
      } catch (error) {
        console.error("❌ Update cart error:", error);
        toast.error("Failed to update cart quantity");
      }
    }
  };

  // ✅ Remove item from cart
  const removeCartItems = async (itemId, size) => {
    const newCart = structuredClone(cartItems);
    delete newCart[itemId][size];
    if (Object.keys(newCart[itemId]).length === 0) delete newCart[itemId];
    setCartItems(newCart);

    if (token) {
      try {
        await axios.post(
          `${backend_url}/cart/remove-cart`,
          { userId: user?._id, productId: itemId, size },
        { headers: { Authorization: `Bearer ${token}` } }

        );
      } catch (error) {
        console.error("❌ Remove cart error:", error);
        toast.error("Failed to remove item from cart");
      }
    }
  };

  // ✅ Get total number of items
  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        totalCount += cartItems[productId][size];
      }
    }
    return totalCount;
  };

  // ✅ Calculate total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const productId in cartItems) {
      const itemInfo = products.find((p) => p._id === productId);
      if (itemInfo) {
        for (const size in cartItems[productId]) {
          totalAmount += (itemInfo.price || 0) * cartItems[productId][size];
        }
      }
    }
    return totalAmount;
  };

  // ✅ Load products and user info on startup
  useEffect(() => {
    getProductData();
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ✅ Context values
  const value = {
  products,
  cartItems,
  addToCart,
  getCartCount,
  getCartAmount,
  updateQuantity,
  removeCartItems,
  selectedProduct,
  setSelectedProduct,
  delivery_fee,
  backend_url,
  token,
  setToken,
  user,
  setUser,
  getUserCart,
  placeOrder, // ✅ add this line
};


  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
