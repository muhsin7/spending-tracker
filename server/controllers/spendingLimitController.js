const SpendingLimit = require("../models/spendingLimitModel");
const asyncHandler = require("express-async-handler");

// @desc get all spending limits belonging to a logged in user
// @route GET /api/limit/
// @access private
const getAllSpendingLimits = asyncHandler(async (req, res) => {
  const spendingLimits = await SpendingLimit.find({ userId: req.user.id });
  res.status(200).json(spendingLimits);
});

// @desc get a spending limit by spendingLimitId
// @route GET /api/limit/:id
// @access private
const getSpendingLimit = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const spendingLimit = await SpendingLimit.find({
      _id: id,
      userId: req.user.id,
    });
    res.status(200).json(spendingLimit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Get limit by category id, use id "1" for global
// @route GET /api/limit/:id
// @access private
const getSpendingLimitByCategory = asyncHandler(async (req, res) => {
  try {
    let { categoryId } = req.params;
    if (categoryId === "1") categoryId = undefined;
    const spendingLimit = await SpendingLimit.find({
      category: categoryId,
      userId: req.user.id,
    });
    res.status(200).json(spendingLimit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Create a new spemding limit
// @route POST /api/limit
// @access private
const createSpendingLimit = asyncHandler(async (req, res) => {
  try {
    const { name, amount, duration, category } = req.body;
    //User cannot create multiple spending limits for one category or have multiple global limits
    if (category === "") {
      throw new Error("You must select a category!");
    }
    const existingSpendingLimit = await SpendingLimit.find({
      userId: req.user.id,
      category: category,
    });
    if (existingSpendingLimit.length) {
      throw new Error("You must only have one spending limit per category!");
    }
    const spendingLimit = await SpendingLimit.create({
      name: name,
      amount: amount,
      duration: duration,
      category: category,
      userId: req.user.id,
    });
    res.status(201).json(spendingLimit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Delete a spending limit by id
// @route DELETE /api/limit/:id
// @access private
const deleteSpendingLimit = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const spendingLimit = await SpendingLimit.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });
    res.status(200).json(spendingLimit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Update a spending limit
// @route PATCH /api/limit/:id
// @access private
const updateSpendingLimit = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const spendingLimit = await SpendingLimit.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { ...req.body }
    );

    res.status(200).json(spendingLimit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  getAllSpendingLimits,
  getSpendingLimit,
  getSpendingLimitByCategory,
  createSpendingLimit,
  deleteSpendingLimit,
  updateSpendingLimit,
};
