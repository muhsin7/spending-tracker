const Achievement = require("../models/achievementModel");
const AchievementSpec = require("../models/achievementSpecModel");
const asyncHandler = require("express-async-handler");
const {buildOwnedObject, buildUnownedObject} = require("../util/achievementFormatting");


// get all
const getAchievements = asyncHandler(async (req, res) => {
  let selection = req.query.selection;

  const achievements = await Achievement.find({userId: req.user.id});
  let items = [];

  if(selection == null || selection == "owned") {
    for (let i = 0; i < achievements.length; i++) {
      const item = await buildOwnedObject(achievements[i]);
      items.push(item);
    }
  }

  if (selection == null || selection == "unowned") {
    const allAchievements = await AchievementSpec.find({});
    for (let i = 0; i < allAchievements.length; i++) {
      const item = buildUnownedObject(allAchievements[i], req.user.id);
      if (achievements.some(achievement => {return achievement.achievementSpecId.equals(allAchievements[i]._id);})) continue;
      
      items.push(item);
    }
  }

  res.status(200).json(items);
});

// get specific
const getAchievement = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;
    const achievement = await Achievement.findOne({_id: id, userId: req.user.id});
    res.status(200).json(await buildOwnedObject(achievement));
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

module.exports = {
  getAchievements,
  getAchievement
};