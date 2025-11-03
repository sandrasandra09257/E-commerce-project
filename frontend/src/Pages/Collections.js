import React, { useContext, useState } from "react";
import pimg1 from '../Assets/Images/p_img1.png'
import pimg2 from '../Assets/Images/Rectangle 3619.png'
import pimg3 from '../Assets/Images/p_img3.png'
import pimg4 from '../Assets/Images/p_img4.png'
import pimg5 from '../Assets/Images/p_img5.png'
import pimg6 from '../Assets/Images/p_img6.png'
import pimg7 from '../Assets/Images/p_img7.png'
import pimg8 from '../Assets/Images/p_img8.png'
import pimg9 from '../Assets/Images/p_img9.png'
import pimg10 from '../Assets/Images/p_img10.png'
import pimg11 from '../Assets/Images/p_img11.png'
import pimg12 from '../Assets/Images/p_img12.png'
import pimg13 from '../Assets/Images/p_img13.png'
import pimg14 from '../Assets/Images/p_img14.png'
import pimg15 from '../Assets/Images/p_img15.png'
import pimg16 from '../Assets/Images/p_img16.png'
import pimg17 from '../Assets/Images/p_img17.png'
import pimg18 from '../Assets/Images/p_img18.png'
import pimg19 from '../Assets/Images/p_img19.png' 
import pimg20 from '../Assets/Images/p_img20.png'
import pimg21 from '../Assets/Images/p_img21.png'
import pimg22 from  '../Assets/Images/p_img22.png' 
import pimg23 from   '../Assets/Images/p_img23.png' 
import pimg24 from   '../Assets/Images/p_img24.png'
import pimg25 from   '../Assets/Images/p_img25.png'
import pimg26 from   '../Assets/Images/p_img26.png'
import pimg27 from  '../Assets/Images/p_img27.png'
import pimg28 from  '../Assets/Images/p_img28.png'
import pimg29 from '../Assets/Images/p_img29.png'
import pimg30 from '../Assets/Images/p_img30.png'
import pimg31 from '../Assets/Images/p_img31.png' 
import pimg32 from '../Assets/Images/p_img32.png'
import pimg33 from '../Assets/Images/p_img33.png'
import pimg34 from '../Assets/Images/p_img34.png'
import pimg35 from '../Assets/Images/p_img35.png'
import pimg36 from '../Assets/Images/p_img36.png'
import pimg37 from '../Assets/Images/p_img37.png'
import pimg38 from '../Assets/Images/p_img38.png'
import pimg39 from '../Assets/Images/p_img39.png'
import pimg40 from '../Assets/Images/p_img40.png'
import pimg41 from '../Assets/Images/p_img41.png'
import pimg42 from '../Assets/Images/p_img42.png'
import pimg43 from '../Assets/Images/p_img43.png'
import pimg44 from '../Assets/Images/p_img44.png'
import pimg45 from '../Assets/Images/p_img45.png'
import pimg46 from '../Assets/Images/p_img46.png'
import pimg47 from '../Assets/Images/p_img47.png'
import pimg48 from '../Assets/Images/p_img48.png'
import pimg49 from '../Assets/Images/p_img49.png'
import pimg50 from '../Assets/Images/p_img50.png'
import pimg51 from '../Assets/Images/p_img51.png'
import pimg52 from '../Assets/Images/p_img52.png'
import { Link } from "react-router-dom";
import Product from "./Product";
import { ShopContext } from "../Components/Context/ShopContext";

 function ProductPage() {
  

  const{products}=useContext(ShopContext)
const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState("");

  // ✅ Handle checkbox selection (for both category & type)
  const handleSelection = (value, selected, setSelected) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // ✅ Filter products by category & type
 let filteredProducts = products.filter((p) => {
  const categoryMatch = selectedCategories.includes(p.category);
  const typeMatch = selectedTypes.includes(p.type);

  // Show all if no filters selected
  if (selectedCategories.length === 0 && selectedTypes.length === 0) return true;

  // If any matches (category OR type), include product
  return categoryMatch || typeMatch;
});
  // ✅ Sort products
  if (sortOption === "low-to-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "high-to-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "newest") {
    filteredProducts = [...filteredProducts].reverse(); // mock "newest"
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-9">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xl font-semibold uppercase tracking-widest mt-7 text-gray-800">
            Filters
          </h3>

          {/* Category Filter */}
          <div className="border border-gray-200 p-4 mt-4 mb-4">
            <h4 className="text-sm font-semibold uppercase mb-3 text-gray-700">
              Categories
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              {["men", "women", "kids"].map((cat) => (
                <label key={cat} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                    checked={selectedCategories.includes(cat)}
                    onChange={() =>
                      handleSelection(cat, selectedCategories, setSelectedCategories)
                    }
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div className="border border-gray-200 p-4 mb-4">
            <h4 className="text-sm font-semibold uppercase mb-3 text-gray-700">
              Type
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              {["topwear", "bottomwear", "winterwear"].map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                    checked={selectedTypes.includes(type)}
                    onChange={() =>
                      handleSelection(type, selectedTypes, setSelectedTypes)
                    }
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div className="w-full md:w-3/4">
          {/* Header + Sort */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h2 className="text-3xl font-medium uppercase tracking-widest text-gray-800">
              All <span className="text-gray-500">Collections</span>
            </h2>
            
              <div className="border-t border-gray-300 w-10 mr-0"></div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <label htmlFor="sort" className="font-medium">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-sm py-1 px-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
              >
                <option value="">Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((p, idx) => (
              <div key={idx} className="group text-left">
                <div className="relative overflow-hidden bg-gray-100 aspect-[4/5] w-full">
              <Link to={`/Product/${p._id}`}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  </Link>
                </div>
                <div className="pt-3 mx-1">
                  <p className="mt-1 text-sm text-gray-700 leading-snug truncate">
                    {p.name}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                  ${p.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* No results */}
          {filteredProducts.length === 0 && (
            <p className="text-gray-500 mt-8 text-center">
              No products found for selected filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;