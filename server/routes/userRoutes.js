const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUser } = require("../controllers/userController");
const { updateExp } = require("../util/levelsUtil");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUser);
router.patch("/exp", protect, updateExp);


module.exports = router;