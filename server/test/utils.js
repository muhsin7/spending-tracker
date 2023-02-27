const Category = require("../models/categoryModel");
const Payment = require("../models/paymentModel");
const User = require("../models/userModel");
const SpendingLimit = require("../models/spendingLimitModel");

const flushDB = async () => {
  await Category.deleteMany({});
  await User.deleteMany({});
  await Payment.deleteMany({});
  await SpendingLimit.deleteMany({});
};

module.exports = {
  flushDB
};