const Product = require("../Models/productModel");
const cloudinary = require("cloudinary").v2;

// ✅ ADD PRODUCT
exports.addProducts = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
      
      

  
    
    } = req.body;
    const image = req.files || [];

    let parsedSizes = [];
    if (sizes) {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch (err) {
        return res.json({ success: false, message: "Invalid sizes JSON" });
      }
    }

    // ✅ Upload images to Cloudinary
    const imageUrls = await Promise.all(
      image.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // ✅ Build product data
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: parsedSizes,
      bestSeller: bestSeller === "true" || bestSeller === true,
      image: imageUrls,
      
      
    };

    console.log("🟢 New Product Data:", productData);

    const product = new Product(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully!" });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  try {
    const getAllProducts = await Product.find();
    res.json({ success: true, message: "All products", getAllProducts });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Error fetching products" });
  }
};

// ✅ GET PRODUCT BY ID
exports.getIdProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json({ success: true, message: "Product fetched by ID", product });
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid ID", err });
  }
};

// ✅ DELETE PRODUCT
exports.deleteProducts = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.json({ success: false, message: "Product not found" });
    res.json({ success: true, message: "Product deleted successfully!" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};