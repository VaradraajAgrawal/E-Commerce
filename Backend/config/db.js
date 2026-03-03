const mongoose = require("mongoose");
const Product = require("../models/product.js");
const ProductsData = require("../Data/ProductsData.js");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const count = await Product.countDocuments();

    if (count === 0) {
      await Product.insertMany(ProductsData);
      console.log("Products seeded");
    }

    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
