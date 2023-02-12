const Payment = require("../models/paymentModel");
const asyncHandler = require("express-async-handler");

// get all
const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({userId: req.user.id});
  res.status(200).json(payments);
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
    const {title, description, image, categoryId} = req.body;
    const payment = await Payment.create({title, description, image, categoryId, userId: req.user.id});
    res.status(200).json(payment);
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
  getPayment,
  createPayment,
  deletePayment,
  updatePayment
};