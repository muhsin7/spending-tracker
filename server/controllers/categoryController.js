const Category = require("../models/categoryModel");
const SpendingLimit = require("../models/spendingLimitModel");
const asyncHandler = require("express-async-handler");
const {
  detectCategoryAchievements,
} = require("../util/categoryAchievementDetection");

// @desc Get all categories beloinging to the logged in user
// @route GET /api/category
// @access private
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ userId: req.user.id });
  res.status(200).json(categories);
});

// @desc Get all categories with a spending limit
// @route GET /api/category/withSpendingLimit
// @access private
const getCategoriesWithSpendingLimits = asyncHandler(async (req, res) => {
  const categories = await Category.find({ userId: req.user.id });
  const catWithSL = await Promise.all(
    categories.map(async (cat) => {
      const sl = await SpendingLimit.find({
        category: cat._id,
        userId: req.user.id,
      });

      ///... operation does not work here due to mongoose wackiness
      return {
        _id: cat._id,
        name: cat.name,
        userId: cat.userId,
        spendingLimit: sl[0],
      };
    })
  );

  res.status(200).json(catWithSL);
});

// @desc get a category by id
// @route GET /api/category/:id
// @access private
const getCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById({ _id: id, userId: req.user.id });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Create a new category
// @route POST /api/category
// @access private
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name, userId: req.user.id });
    const achievements = await detectCategoryAchievements(req);

    let catObj = category.toObject();
    catObj.achievements = achievements;

    res.status(201).json(catObj);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Delete a category
// @route DELETE /api/category/:id
// @access private
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Update a category
// @route PATCH /api/category/:id
// @access private
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { ...req.body }
    );

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Get categories without spending limits
// @route GET /api/category/noSpendingLimit
// @access private
const getNoSpendingLimitCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user.id });
    const spendingLimits = await SpendingLimit.find({ userId: req.user.id });

    const categoryIds = spendingLimits.map((sl) => sl.category);
    const filteredCategories = categories.filter(
      (cat) => !categoryIds.some((cid) => cat._id.equals(cid))
    );
    //some() is used here instead of includes() because === equality does not work with ObjectIds (immutability stuff)

    res.status(200).json(filteredCategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  getCategories,
  getCategoriesWithSpendingLimits,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  getNoSpendingLimitCategory,
};
