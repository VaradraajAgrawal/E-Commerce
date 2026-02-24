const asyncHandler = require("../middleware/asyncHandler");
const Practise = require("../models/UserModel");
const generateToken = require("../utils/generateToken");

exports.register = asyncHandler(async (req, res) => {
  const { fullName, password, email } = req.body;
  await Practise.create(req.body);
  res.status(201).json({
    fullName,
    password,
    email,
    role,
  });
});

exports.identity = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

exports.fetchAll = asyncHandler(async (req, res) => {
  const allData = await Practise.find();
  if (!allData) {
    res.status(404);
    throw new Error("Something Went wrong!!");
  }

  res.status(200).json({
    success: true,
    data: allData,
  });
});

exports.loginCheck = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password required");
  }

  const user = await Practise.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  res.status(200).json({
    success: true,
    token: generateToken(user._id),
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});
