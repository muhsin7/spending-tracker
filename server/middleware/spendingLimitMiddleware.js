const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const SpendingLimit = require("../models/spendingLimitModel");

const mustOwnValidCategory = asyncHandler(async(req, res, next) => {
  const {category} = req.body;
  const userId = req.user.id;
  const categoryObj = await Category.findOne({_id:category});
  console.log(category);
  
  //If category is undefined in the request, user is trying to set a global spending limit
  if (category == undefined) {
    console.log("ok");
    return next();
  }

  if (categoryObj == undefined) {
    res.status(404);
    throw new Error("Category not found");
  }

  if (categoryObj.userId != userId) {
    res.status(403);
    throw new Error("User does not own this category");
  }

  next();
});

const mustOwnValidSpendingLimit = asyncHandler(async(req, res, next) => {
  const userId = req.user.id;
  const {id} = req.params;
  
  const spendingLimit = await SpendingLimit.findOne({_id: id});

  if (spendingLimit == undefined) {
    res.status(404);
    throw new Error("Spending limit not found!");
  }

  if (spendingLimit.userId != userId) {
    res.status(403);
    throw new Error("User does not own this spending limit!");
  }
  next();
});

module.exports = {mustOwnValidCategory, mustOwnValidSpendingLimit};