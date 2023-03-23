const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUser, updateExp, editUser } = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.patch("/", protect, editUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUser);
router.patch("/exp", protect, updateExp);


module.exports = router;