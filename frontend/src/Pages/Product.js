import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfStroke as farStarHalf } from "@fortawesome/free-regular-svg-icons";
import { ShopContext } from "../Components/Context/ShopContext";


function Product() {
  const { products, addToCart } = useContext(ShopContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Temporary product (may be undefined on first render)
  const productData = products.find((item) => item._id === id);

  // Always define hooks first
  const [selectedImage, setSelectedImage] = useState(productData?.image || "");
  const [selectedSize, setSelectedSize] = useState("");

  // Handle if no product yet (loading or invalid id)
  if (!productData) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Product not found or still loading...
      </div>
    );
  }

  // Collect all product images
  const images = [
    productData.image,
    productData.image,
    productData.image,
    productData.image,
    
  ].filter(Boolean);

  // Initialize selectedImage if not already set
  const mainImage = selectedImage || images[0];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart!");
      return;
    }
    addToCart(productData._id, selectedSize);
    toast.success("Added to cart successfully!");
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Image Section */}
        <div className="flex w-full md:w-1/2 gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col space-y-4 max-w-[120px]">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`w-full h-auto aspect-square object-cover border cursor-pointer transition ${
                  mainImage === img
                    ? "border-black"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-4/5">
            <img
              src={mainImage}
              alt={productData.name}
              className="w-full h-auto object-cover rounded"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-2xl font-semibold">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="text-orange-500 text-sm">
              <FontAwesomeIcon icon={fasStar} />
              <FontAwesomeIcon icon={fasStar} />
              <FontAwesomeIcon icon={fasStar} />
              <FontAwesomeIcon icon={fasStar} />
              <FontAwesomeIcon icon={farStarHalf} />
            </div>
            <span className="text-sm text-gray-500">(122)</span>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold">${productData.price}</p>

          <p className="text-sm text-gray-600">
            A lightweight, usually knitted pullover shirt, close-fitting and
            with a round neckline and short sleeves.
          </p>

          {/* Select Size */}
          <div>
            <p className="font-semibold mb-2">Select Size</p>
            <div className="flex gap-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 border rounded ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-gray-300 hover:border-gray-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 mt-4 hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
