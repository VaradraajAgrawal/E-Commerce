const express = require("express");
const {
  register,
  loginCheck,
  fetchAll,
  identity,
} = require("../controller/Practise");
const { protect, authorize } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/who", protect, identity);
router.get("/admin", protect, authorize("admin"), fetchAll);
router.post("/", register);
router.post("/login", loginCheck);

module.exports = router;
