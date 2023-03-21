const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUser, increaseLevel } = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUser);
router.patch("/exp", protect, increaseLevel);


module.exports = router;