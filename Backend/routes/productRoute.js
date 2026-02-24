const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const validateProduct = require("../middleware/validateProduct");
const router = express.Router();

router.post("/", validateProduct, createProduct);
router.put("/:id", validateProduct, updateProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

module.exports = router;
