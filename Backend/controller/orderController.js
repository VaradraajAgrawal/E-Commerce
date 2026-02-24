const Order = require("../models/orderModel");
const Cart = require("../models/Cart");
const asyncHandler = require("../middleware/asyncHandler");

exports.created = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user._id }).populate(
    "items.productId",
    "title price image"
  );

  if (!cart || cart.items.length === 0) {
    throw new Error("NO CART!!");
  }

  const subTotal = cart.items.reduce(
    (acc, item) => acc + item.quantity * item.productId.price,
    0
  );
  const taxAmt = subTotal * 0.18;
  const totalAmt = subTotal + taxAmt;

  const orderItem = cart.items.map((item) => ({
    productId: item.productId._id,
    title: item.productId.title,
    price: item.productId.price,
    image: item.productId.image,
    quantity: item.quantity,
  }));

  const order = await Order.create({
    userId: req.user._id,
    items: orderItem,
    subTotal,
    taxAmt,
    totalAmt,
  });

  cart.items = [];
  await cart.save();
  res.status(201).json(order);
});

exports.getAll = asyncHandler(async (req, res) => {
  let orders = await Order.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });

  if (!orders) {
    throw new Error("getAll Failed!!");
  }
  res.status(200).json(orders);
});
