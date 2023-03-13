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

// post new
const createAchievement = asyncHandler(async (req, res) => {
  try {
    const {name, description, goal, progress, completed} = req.body;
    const achievement = await Achievement.create({name, description, goal, progress, completed, userId: req.user.id});
    res.status(201).json(achievement);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// update
const updateAchievement = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;
    const achievement = await Achievement.findOneAndUpdate({id: id, userId: req.user.id}, {$inc: {progress: 1}});

    res.status(200).json(achievement);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}); 

module.exports = {
  getAchievements,
  getAchievement,
  createAchievement,
  updateAchievement
};