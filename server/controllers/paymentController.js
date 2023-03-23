const Payment = require("../models/paymentModel");
const asyncHandler = require("express-async-handler");
const {detectPaymentAchievements} = require("../util/paymentAchievementDetection");

// get all
const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({userId: req.user.id});
  res.status(200).json(payments);
});

const summarise = (payments) => {
  let sum = 0;
  for (let i = 0; i < payments.length; i++) {
    sum = sum + payments[i].amount;
  }
  return sum;
};
  
// summary
const getSummary = asyncHandler(async (req, res) => {
  let days = req.query.days;
  const dt = new Date();

  const lastDay = await Payment.find({userId: req.user.id, date: {$gt: new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0)}});
  let weekCuttOff = new Date();
  weekCuttOff.setDate(weekCuttOff.getDate() - 7);
  const lastWeek = await Payment.find({userId: req.user.id, date: {$gt: weekCuttOff}});
  const lastMonth = await Payment.find({userId: req.user.id, date: {$gt: new Date(dt.getFullYear(), dt.getMonth(), 1)}});
  const lastYear = await Payment.find({userId: req.user.id, date: {$gt: new Date(dt.getFullYear(), 0, 1)}});

  let json = {
    year: summarise(lastYear),
    month: summarise(lastMonth),
    week: summarise(lastWeek),
    day: summarise(lastDay)
  };

  if (days !== undefined) {
    let customCutOff = new Date();
    customCutOff.setDate(customCutOff.getDate() - days);
    const lastCustom = await Payment.find({userId: req.user.id, date: {$gt: customCutOff}});
    json.custom = summarise(lastCustom);
  }

  res.status(200).json(json);
});

// get specific
const getPayment = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;
    const payments = await Payment.findById({_id: id, userId: req.user.id});
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// post new
const createPayment = asyncHandler(async (req, res) => {
  try {
    const {title, description, date, amount, image, categoryId} = req.body;
    const payment = await Payment.create({title, description, date, amount, image, categoryId, userId: req.user.id});
    const achievements = await detectPaymentAchievements(req);

    let payObj = payment.toObject();
    payObj.achievements = achievements;

    res.status(201).json(payObj);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// delete
const deletePayment = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;
    const payment = await Payment.findOneAndDelete({_id: id, userId: req.user.id});
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});
  
// update
const updatePayment = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params;
    const payment = await Payment.findByIdAndUpdate({_id: id, userId: req.user.id}, {...req.body});
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});
  
module.exports = {
  getPayments,
  getSummary,
  getPayment,
  createPayment,
  deletePayment,
  updatePayment
};