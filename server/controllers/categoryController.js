const Category = require("../models/categoryModel");
const SpendingLimit = require("../models/spendingLimitModel");
const asyncHandler = require("express-async-handler");

// get all
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({userId: req.user.id});
  res.status(200).json(categories);
});

//get all categories with spending limits
const getCategoriesWithSpendingLimits = asyncHandler(async (req, res) => {
  const categories = await Category.find({userId: req.user.id});
  const catWithSL = await Promise.all(categories.map(async (cat) => {
    const sl = await SpendingLimit.find({category: cat._id, userId: req.user.id});

    ///... operation does not work here due to mongoose wackiness
    return {
      _id: cat._id,
      name: cat.name,
      userId: cat.userId,
      spendingLimit: sl[0] === undefined ? "none" : sl[0].amount.toString()
    };
    
  }));

  res.status(200).json(catWithSL);
});

// get specific
const getCategory = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;
    const category = await Category.findById({_id: id, userId: req.user.id});
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
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// delete
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;
    const category = await Category.findOneAndDelete({_id: id, userId: req.user.id});
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// update
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;
    const category = await Category.findOneAndUpdate({_id: id, userId: req.user.id}, {...req.body});
    
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// get categories without spending limits
const getNoSpendingLimitCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({userId: req.user.id});
    const spendingLimits = await SpendingLimit.find({userId: req.user.id});

    const categoryIds = spendingLimits.map(sl => sl.category);
    const filteredCategories = categories.filter(cat => !categoryIds.some(cid => cat._id.equals(cid)));
    //some() is used here instead of includes() because === equality does not work with ObjectIds (immutability stuff)

    res.status(200).json(filteredCategories);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

module.exports = {
  getCategories,
  getCategoriesWithSpendingLimits,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  getNoSpendingLimitCategory
};