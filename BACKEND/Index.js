const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoDB = require("./Config/mongodb");
const userRouter = require("./Routers/userRouter");
const productRouter=require("./Routers/productRouter");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000","http://localhost:3001"], credentials: true }));


app.use("/user", userRouter);
app.use("/product", productRouter);



app.get("/", (req, res) => res.send("Backend is working!"));


mongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});


