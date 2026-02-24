const asyncHandler = require("../middleware/asyncHandler");
const validateProduct = asyncHandler(async (req, res, next) => {
  const { title, description, price, category, image } = req.body;

  if (!title || !description || !category || !image) {
    res.status(400);
    return next(new Error("All fields are required"));
  }

  if (typeof price !== "number" || price <= 0) {
    res.status(400);
    return next(new Error("Price must be a positive number"));
  }

  next();
});

module.exports = validateProduct;
