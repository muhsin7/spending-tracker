const express = require("express");
const router = express.Router();

const { getAchievements, getAchievement } = require("../controllers/achievementController");
const { protect } = require("../middleware/authMiddleware");

router.route("/")
  .get(protect, getAchievements);

router.route("/:id")
  .get(protect, getAchievement);

module.exports = router;