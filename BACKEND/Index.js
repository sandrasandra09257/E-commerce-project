const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoDB = require("./Config/mongodb");
const userRouter = require("./Routers/userRouter");
const productRouter = require("./Routers/productRouter");
const orderRouter = require("./Routers/orderRouter");
const cartRouter = require("./Routers/cartRouter");
const cloudinary = require("cloudinary").v2;

const app = express();
const PORT = process.env.PORT || 4000;

// 🧠 Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🧩 Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

// 🛣 Routers
app.use("/images", express.static("images"));
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/cart", cartRouter);

// 🌐 Default route
app.get("/", (req, res) => res.send("✅ Backend is working!"));

// 🧩 Start server after DB connection
mongoDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
