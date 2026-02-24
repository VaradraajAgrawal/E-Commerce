const Cart = require("../models/Cart");
const Product = require("../models/product");
const asyncHandler = require("../middleware/asyncHandler");

/**
 * Helper: always return populated cart
 */
const getPopulatedCart = async (userId) => {
  return Cart.findOne({ userId }).populate(
    "items.productId",
    "title price image stock"
  );
};

const calculatePrice = (items) => {
  const tax = 0.18;
  const subTotal = items.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  const taxAmt = subTotal * tax;
  const totalAmt = subTotal + taxAmt;

  // Rounding to 2 decimal places to avoid math bugs
  return {
    taxAmt: Number(taxAmt.toFixed(2)),
    totalAmt: Number(totalAmt.toFixed(2)),
    subTotal: Number(subTotal.toFixed(2)),
  };
};
/**
 * GET CART
 */
exports.getCart = asyncHandler(async (req, res) => {
  let cart = await getPopulatedCart(req.user._id);

  if (!cart) {
    await Cart.create({
      userId: req.user._id,
      items: [],
    });

    cart = await getPopulatedCart(req.user._id);
  }
  const { subTotal, taxAmt, totalAmt } = calculatePrice(cart.items);
  res.json({ items: cart.items, subTotal, taxAmt, totalAmt });
});

/**
 * ADD TO CART
 */
exports.addToCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    throw new Error("productId is required");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    cart = await Cart.create({
      userId: req.user._id,
      items: [],
    });
  }

  const item = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (item) {
    if (item.quantity >= product.stock) {
      throw new Error("Out of stock");
    }
    item.quantity += 1;
  } else {
    if (product.stock < 1) {
      throw new Error("Out of stock");
    }
    cart.items.push({ productId, quantity: 1 });
  }

  await cart.save();

  const populatedCart = await getPopulatedCart(req.user._id);
  const { subTotal, taxAmt, totalAmt } = calculatePrice(populatedCart.items);
  res.json({ items: populatedCart.items, subTotal, taxAmt, totalAmt });
});

/**
 * UPDATE CART (SET QUANTITY)
 */
exports.updateCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || typeof quantity !== "number") {
    throw new Error("Invalid input");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (!item) {
    throw new Error("Product not in cart");
  }

  if (quantity <= 0) {
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
  } else {
    if (quantity > product.stock) {
      throw new Error("Out of stock");
    }
    item.quantity = quantity;
  }

  await cart.save();

  const populatedCart = await getPopulatedCart(req.user._id);
  const { subTotal, taxAmt, totalAmt } = calculatePrice(populatedCart.items);

  res.json({ items: populatedCart.items, subTotal, taxAmt, totalAmt });
});

/**
 * REMOVE ITEM FROM CART
 */
exports.removeItem = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    throw new Error("productId is required");
  }

  let cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await cart.save();

  const populatedCart = await getPopulatedCart(req.user._id);
  const { subTotal, taxAmt, totalAmt } = calculatePrice(populatedCart.items);

  res.json({ items: populatedCart.items, subTotal, taxAmt, totalAmt });
});
