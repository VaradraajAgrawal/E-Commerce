const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  removeItem,
  updateCart,
} = require("../controller/cartController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.put("/update", protect, updateCart);
router.delete("/remove", protect, removeItem);

module.exports = router;
