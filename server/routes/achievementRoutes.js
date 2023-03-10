const express = require("express");
const router = express.Router();

const {getAchievements, getAchievement, createAchievement, updateAchievement} = require("../controllers/achievementController");
const { protect } = require("../middleware/authMiddleware");
const { mustOwnValidAchievement } = require("../middleware/achievementMiddleware");

router.route("/")
  .get(protect, getAchievements)
  .post(protect, createAchievement);

router.route("/:id")
  .get(protect, mustOwnValidAchievement, getAchievement)
  .patch(protect, mustOwnValidAchievement, updateAchievement);

module.exports = router;