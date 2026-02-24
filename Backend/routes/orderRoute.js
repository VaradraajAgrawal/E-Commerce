const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const { getAll, created } = require("../controller/orderController");

router.post("/", protect, created);
router.get("/", protect, getAll);

module.exports = router;
