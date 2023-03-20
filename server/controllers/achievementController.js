const Achievement = require("../models/achievemetModel");
const asyncHandler = require("express-async-handler");

// get all
const getAchievements = asyncHandler(async (req, res) => {
  const achievements = await Achievement.find({userId: req.user.id});
  res.status(200).json(achievements);
});

// get specific
const getAchievement = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;
    const achievement = await Achievement.findById({id: id, userId: req.user.id});
    res.status(200).json(achievement);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

module.exports = {
  getAchievements,
  getAchievement
};