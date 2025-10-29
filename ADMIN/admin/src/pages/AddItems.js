import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backend_url = process.env.REACT_APP_BACKEND_URL;

const AddItems = ({ token }) => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSizeClick = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((file) => formData.append("images", file));
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("price", price);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("bestSeller", bestSeller);

    try {
      await axios.post(`${backend_url}/product/add`, formData, {
        headers: { token },
      });
      toast.success("✅ Product added successfully!",{
        autoClose: 1000,
      });
    } catch (error) {
      toast.error("❌ Failed to add product!");
    }
  };

  return (
    <div className="p-8 w-full bg-white rounded-2xl shadow-sm">
      {/* Upload Section */}
      <h2 className="text-2xl font-semibold mb-4">Upload Image</h2>
      <div className="flex gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <label
            key={i}
            className="w-28 h-28 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:text-indigo-500 text-gray-500 text-sm"
          >
            Upload
            <input type="file" hidden onChange={handleImageUpload} />
          </label>
        ))}
      </div>

    
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>


        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Product Description
          </label>
          <textarea
            placeholder="Description"
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Category
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              SubCategory
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="">Select</option>
              <option value="shirts">Shirts</option>
              <option value="pants">Pants</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Price
            </label>
            <input
              type="number"
              placeholder="₹"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

    
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Product Sizes
          </label>
          <div className="flex gap-3">
            {["S", "M", "L", "XL", "XXL"].map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => handleSizeClick(s)}
                className={`px-4 py-2 rounded-md border ${
                  sizes.includes(s)
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bestSeller}
            onChange={(e) => setBestSeller(e.target.checked)}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
          />
          <label className="text-gray-700 font-medium">Add To Best Seller</label>
        </div>

    
        <button
          type="submit"
          className="mt-4 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-8 py-3 rounded-lg shadow-md"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddItems;
