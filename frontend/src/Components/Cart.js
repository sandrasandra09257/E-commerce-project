import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Components/Context/ShopContext";

const CartPage = () => {
  const {
    cartItems,
    products,
    removeCartItems,
    getCartAmount,
    updateQuantity,
    delivery_fee,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
 const subTotal = Number(getCartAmount()) || 0;
const shippingFee = subTotal > 0 ? Number(delivery_fee) : 0;
const total = subTotal + shippingFee;
  // ✅ Fixed loop logic
  useEffect(() => {
    let temp = [];

    // Loop through each product in the cart
    for (const productId in cartItems) {
      const sizes = cartItems[productId];
      for (const size in sizes) {
        if (sizes[size] > 0) {
          temp.push({
            _id: productId,
            size,
            quantity: sizes[size],
          });
        }
      }
    }

    setCartData(temp);
  }, [cartItems]);

  return (
    <section className="px-4 md:px-24">
      {/* ✅ Use CSS border line instead of undefined border image */}
      <div className="border-t border-gray-300 mt-6"></div>

      <div className="flex items-center justify-between">
        <div className="mt-14 font-normal text-3xl leading-9 text-[#707070]">
          YOUR{" "}
          <span className="font-semibold text-[#171717] text-3xl leading-9">
            CART
          </span>
        </div>

        {/* ✅ Simple gray line (no image needed) */}
        <div className="h-0.5 w-12 bg-gray-400 mt-20"></div>
      </div>

      <div className="border-t border-gray-300 mt-6"></div>

      {cartData.length === 0 ? (
        <p className="text-center pt-10 text-red-600 text-3xl font-bold">
          Your Cart Is Empty!
        </p>
      ) : (
        <>
          {cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            return (
              <div
                key={`${item._id}-${item.size}`}
                className="flex items-center justify-between border-b py-4"
              >
                {/* Product info */}
                <div className="flex items-center w-1/3">
                  <img
                    className="h-32 w-32 object-cover"
                    src={productData?.image[0]}
                    alt={productData?.name}
                  />
                  <div className="flex flex-col space-y-2 ml-4">
                    <div className="font-medium text-[18px] text-[#2A2A2A]">
                      {productData?.name}
                    </div>
                    <div className="text-lg font-normal text-[#2A2A2A]">
                      ${productData?.price}
                    </div>
                    <div className="border-2 border-gray-300 w-8 h-8 flex items-center justify-center bg-slate-100">
                      {item.size}
                    </div>
                  </div>
                </div>

                {/* Quantity input */}
                <div className="w-1/3 flex justify-center">
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    max={100}
                    className="w-16 h-10 text-center border border-gray-300 rounded-md"
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(
                            item._id,
                            item.size,
                            Number(e.target.value)
                          )
                    }
                  />
                </div>

                {/* Delete button */}
                <div className="w-1/3 flex justify-end">
                  <button
                    className="h-10 w-24 border-2 bg-red-500 rounded-lg text-white"
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            );
          })}

          {/* Cart totals */}
          <div className="flex justify-end mt-12">
            <div className="w-1/3 space-y-4">
              <div className="text-2xl font-semibold">CART TOTALS</div>
              <div className="border-t border-gray-300"></div>
              <div>
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
              <Link to="/Delivery">
                <button className="border-2 h-12 w-60 bg-black text-white self-center mt-8 ml-3">
                  PROCEED TO CHECKOUT
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CartPage;
