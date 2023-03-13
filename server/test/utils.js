/* eslint-disable no-unused-vars */
const Category = require("../models/categoryModel");
const Payment = require("../models/paymentModel");
const User = require("../models/userModel");
const SpendingLimit = require("../models/spendingLimitModel");
const Achievement = require("../models/achievementModel");
const jwt = require("jsonwebtoken");

const chai = require("chai");
const should = chai.should();

const flushDB = async () => {
  await Category.deleteMany({});
  await User.deleteMany({});
  await Payment.deleteMany({});
  await SpendingLimit.deleteMany({});
  await Achievement.deleteMany({});
};

const assertError = (res, code) => {
  res.should.have.status(code);
  res.body.should.be.a("object");
  res.body.should.have.property("error");
  res.body.should.have.property("message");
  res.body.should.have.property("status");
  res.body.should.have.property("stacktrace");
};

const generateToken = (user) => {
  return jwt.sign({ id:user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_VALID_FOR
  });
};

module.exports = {
  flushDB,
  assertError,
  generateToken
};