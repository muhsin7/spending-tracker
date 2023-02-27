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

const assertError = (res, code) => {
  res.should.have.status(code);
  res.body.should.be.a("object");
  res.body.should.have.property("error");
  res.body.should.have.property("message");
  res.body.should.have.property("status");
  res.body.should.have.property("stacktrace");
};

module.exports = {
  flushDB,
  assertError
};