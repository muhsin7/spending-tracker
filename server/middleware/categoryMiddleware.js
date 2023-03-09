const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

const mustOwnValidCategory = asyncHandler(async(req, res, next) => {
  const {id} = req.params;
  const userId = req.user.id;
  const category = await Category.findOne({_id: id});

  if (category == undefined) {
    res.status(404);
    throw new Error("Category not found");
  }

  if (category.userId != userId) {
    res.status(403);
    throw new Error("User does not own this category");
  }
  next();
});

module.exports = {mustOwnValidCategory};