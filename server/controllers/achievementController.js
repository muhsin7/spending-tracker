const Achievement = require("../models/achievementModel");
const AchievementSpec = require("../models/achievementSpecModel");
const asyncHandler = require("express-async-handler");

const buildAchievementJSON = async(achievement) => {
  const spec = await AchievementSpec.findById(achievement.achievementSpecId);
  return {
    title: spec.title,
    description: spec.description,
    type: spec.type,
    exp: spec.exp,
    date: achievement.date,
    userId: achievement.userId
  };
};

// get all
const getAchievements = asyncHandler(async (req, res) => {
  const achievements = await Achievement.find({userId: req.user.id});

  let items = [];

  for (let i = 0; i < achievements.length; i++) {
    const item = await buildAchievementJSON(achievements[i]);
    items.push(item);
  }

  res.status(200).json(items);
});

// get specific
const getAchievement = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;
    const achievement = await Achievement.findOne({_id: id, userId: req.user.id});
    res.status(200).json(await buildAchievementJSON(achievement));
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

module.exports = {
  getAchievements,
  getAchievement
};