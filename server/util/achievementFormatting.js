const AchievementSpec = require("../models/achievementSpecModel");

const buildOwnedObject = async(achievement) => {
  const spec = await AchievementSpec.findById(achievement.achievementSpecId);
  return {
    title: spec.title,
    description: spec.description,
    owned: true,
    type: spec.type,
    exp: spec.exp,
    date: achievement.date,
    userId: achievement.userId,
    _id: achievement._id
  };
};
  
const buildUnownedObject = (spec) => {
  return {
    title: spec.title,
    description: spec.description,
    owned: false,
    type: spec.type,
    exp: spec.exp,
    date: null,
    achievementId: null,
    userId: null
  };
};

module.exports = {
  buildOwnedObject,
  buildUnownedObject
};