const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const Payment = require("../models/paymentModel");

const mustOwnValidCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.body;
  const userId = req.user.id;

  if (categoryId === "") {
    res.status(400);
    throw new Error("You must choose a category!");
  }

  const category = await Category.findOne({ _id: categoryId });

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

const mustOwnValidPayment = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;

  const payment = await Payment.findOne({ _id: id });

  if (payment == undefined) {
    res.status(404);
    throw new Error("Payment not found");
  }

  if (payment.userId != userId) {
    res.status(403);
    throw new Error("User does not own this payment");
  }
  next();
});

module.exports = { mustOwnValidCategory, mustOwnValidPayment };
