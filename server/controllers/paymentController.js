const Payment = require("../models/paymentModel");
const asyncHandler = require("express-async-handler");
const {
  detectPaymentAchievements,
} = require("../util/paymentAchievementDetection");
const {
  detectStreakAchievements,
} = require("../util/streakAchievementDetection");

// @desc Get all payments belonging to the logged in user
// @route GET /api/payment
// @access private
const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({ userId: req.user.id });
  res.status(200).json(payments);
});

// Get the total value of a set of payments
const getTotal = (payments) => {
  let sum = 0;
  for (let i = 0; i < payments.length; i++) {
    sum = sum + payments[i].amount;
  }
  return sum;
};

// @desc Get a summary of a users payments in YTD, MTD and WTD
// @route GET /api/payment/summary/?days=
// @access private
const getSummary = asyncHandler(async (req, res) => {
  let days = req.query.days;
  const dt = new Date();

  // get timeframes
  const lastDay = await Payment.find({
    userId: req.user.id,
    date: { $gt: new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0) },
  });
  let weekCuttOff = new Date();
  weekCuttOff.setDate(weekCuttOff.getDate() - 7);
  const lastWeek = await Payment.find({
    userId: req.user.id,
    date: { $gt: weekCuttOff },
  });
  const lastMonth = await Payment.find({
    userId: req.user.id,
    date: { $gt: new Date(dt.getFullYear(), dt.getMonth(), 1) },
  });
  const lastYear = await Payment.find({
    userId: req.user.id,
    date: { $gt: new Date(dt.getFullYear(), 0, 1) },
  });

  // make object
  let object = {
    year: getTotal(lastYear),
    month: getTotal(lastMonth),
    week: getTotal(lastWeek),
    day: getTotal(lastDay),
  };

  // if custom timeframe is provided
  if (days !== undefined) {
    let customCutOff = new Date();
    customCutOff.setDate(customCutOff.getDate() - days);
    const lastCustom = await Payment.find({
      userId: req.user.id,
      date: { $gt: customCutOff },
    });
    object.custom = getTotal(lastCustom);
  }

  res.status(200).json(object);
});

// @desc Get payment by paymentId
// @route GET /api/payment/:id
// @access private
const getPayment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const payments = await Payment.findById({ _id: id, userId: req.user.id });
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Create a new payment
// @route POST /api/payment
// @access private
const createPayment = asyncHandler(async (req, res) => {
  try {
    const { title, description, date, amount, image, categoryId } = req.body;

    const payment = await Payment.create({
      title,
      description,
      date,
      amount,
      image,
      categoryId,
      userId: req.user.id,
    });

    // detect achievements if any
    let achievements = [];
    const paymentAchievements = await detectPaymentAchievements(req);
    const streakAchievements = await detectStreakAchievements(req);
    achievements = paymentAchievements.concat(streakAchievements);

    let payObj = payment.toObject();
    payObj.achievements = achievements;

    res.status(201).json(payObj);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc delete a payment by paymentId
// @route DELETE /api/payment/:id
// @access private
const deletePayment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc update a payment by paymentId
// @route PATCH /api/payment/:id
// @access private
const updatePayment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndUpdate(
      { _id: id, userId: req.user.id },
      { ...req.body }
    );
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  getPayments,
  getSummary,
  getPayment,
  createPayment,
  deletePayment,
  updatePayment,
};
