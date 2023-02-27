/* eslint-disable no-unused-vars */
const Category = require("../models/categoryModel");
const Payment = require("../models/paymentModel");
const User = require("../models/userModel");
const SpendingLimit = require("../models/spendingLimitModel");

const chai = require("chai");
const should = chai.should();

const flushDB = async () => {
  await Category.deleteMany({});
  await User.deleteMany({});
  await Payment.deleteMany({});
  await SpendingLimit.deleteMany({});
};

const assertError = (res) => {
  res.should.have.status(400);
  res.body.should.be.a("object");
  res.body.should.have.property("error");
  res.body.should.have.property("message");
  res.body.should.have.property("status");
};

module.exports = {
  flushDB,
  assertError
};