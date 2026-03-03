require("dotenv").config();
const errorHandler = require("./middleware/errorMiddleware");
const express = require("express");
const cors = require("cors");
const practiseRoute = require("./routes/practiseRoute");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoute");
const notFound = require("./middleware/notFound");
const cartRoutes = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/practise", practiseRoute);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/order", orderRoute);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  const PORT = 8000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
