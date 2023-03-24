const User = require("../models/userModel");
const AchievementSpec = require("../models/achievementSpecModel");
const Achievement = require("../models/achievementModel");
const { buildOwnedObject } = require("./achievementFormatting");
const { updateExp } = require("./levelsUtil");

/**
 * Return the number of days since the user has
 * last broken their streak
 */
const getStreakDays = (user) => {
  const now = new Date();
  const timeDiff = Math.abs(user.streakSince - now);
  const daysdiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return daysdiff;
};

/**
 * Return Achievement specifications that have been achieved
 * by the user
 */
const findAchievments = async (req) => {
  const user = await User.findById(req.user.id);
  const query = {
    "requirements.underLimitStreak.target": { $lte: getStreakDays(user) },
  };
  const specs = await AchievementSpec.find(query);
  return specs;
};

const detectStreakAchievements = async (req) => {
  const specs = await findAchievments(req);
  let achievements = [];

  for (let i = 0; i < specs.length; i++) {
    try {
      const achievement = await Achievement.create({
        userId: req.user.id,
        achievementSpecId: specs[i]._id,
      });

      await updateExp({ user: req.user, exp: specs[i].exp });

      achievements.push(await buildOwnedObject(achievement));
    } catch {
      // ignore
    }
  }

  return achievements;
};

module.exports = {detectStreakAchievements};
