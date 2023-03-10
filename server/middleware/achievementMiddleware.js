const asyncHandler = require("express-async-handler");
const Achievement = require("../models/achievementModel");

const mustOwnValidAchievement = asyncHandler(async(req, res, next) => {
  const {id} = req.params;
  const userId = req.user.id;
  const achievement = await Achievement.findOne({_id: id});

  if (achievement == undefined) {
    res.status(404);
    throw new Error("Achievement not found");
  }

  if (achievement.userId != userId) {
    res.status(403);
    throw new Error("User does not own this achievement");
  }
  next();
});

module.exports = {mustOwnValidAchievement};