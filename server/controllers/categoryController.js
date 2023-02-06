const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");

// get all
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({userId: req.user.id});
  res.status(200).json(categories);
});

// get specific
const getCategory = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// post new
const createCategory = asyncHandler(async (req, res) => {
  try {
    const {name} = req.body;
    const category = await Category.create({name, userId: req.user.id});
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// delete
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;
    const category = await Category.findOneAndDelete({id});
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// update
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;
    const category = await Category.findByIdAndUpdate(id, {
      ...req.body
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory
};