const SpendingLimit = require("../models/spendingLimitModel");
const asyncHandler = require("express-async-handler");

// get all
const getAllSpendingLimits = asyncHandler(async (req, res) => {
  const spendingLimits = await SpendingLimit.find({userId: req.user.id});
  res.status(200).json(spendingLimits);
});

// get specific
const getSpendingLimit = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;
    const spendingLimit = await SpendingLimit.find({_id: id, userId: req.user.id});
    res.status(200).json(spendingLimit);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// post new
const createSpendingLimit = asyncHandler(async (req, res) => {
  try {
    const {name, amount, duration, category} = req.body;
    const spendingLimit = await SpendingLimit.create({name: name, amount: amount, duration: duration, category: category, userId: req.user.id});
    res.status(200).json(spendingLimit);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// delete
const deleteSpendingLimit = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;
    const spendingLimit = await SpendingLimit.findOneAndDelete({_id: id, userId: req.user.id});
    res.status(200).json(spendingLimit);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// update
const updateSpendingLimit = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;
    const spendingLimit = await SpendingLimit.findOneAndUpdate({_id: id, userId: req.user.id}, {...req.body});
    
    res.status(200).json(spendingLimit);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

module.exports = {
  getAllSpendingLimits,
  getSpendingLimit,
  createSpendingLimit,
  deleteSpendingLimit,
  updateSpendingLimit
};