const Category = require("../models/categoryModel");
const AchievementSpec = require("../models/achievementSpecModel");
const Achievement = require("../models/achievementModel");
const {buildOwnedObject} = require("./achievementFormatting");

const findAchievments = async(req) => {
  const noCategories = await Category.countDocuments({userId: req.user.id});
  const query = {
    "requirements.noCategories.target": { $lte: noCategories }
  };
  const specs =  await AchievementSpec.find(query);
  return specs;
};

const detectCategoryAchievements = async(req) => {
  const specs = await findAchievments(req);
  let achievements = [];

  for (let i = 0; i < specs.length; i++) {
    const achievement =  await Achievement.create({
      userId: req.user.id,
      achievementSpecId: specs[i]._id
    });

    achievements.push(await buildOwnedObject(achievement));
  }

  return achievements;
};

module.exports = {detectCategoryAchievements};