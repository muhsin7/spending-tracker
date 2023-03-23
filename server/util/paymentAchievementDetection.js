const Payment = require("../models/paymentModel");
const Achievement = require("../models/achievementModel");
const AchievementSpec = require("../models/achievementSpecModel");
const {buildOwnedObject} = require("./achievementFormatting");

const getLargestPayment = (payments) => {
  const largestPaymentObj = payments.reduce((prev, current) => {
    return (prev.amount > current.amount) ? prev : current;
  });
  return largestPaymentObj.amount;
};

const checkRequirement = (requirement, value) => {
  if (requirement == undefined) return true;

  if (requirement.boolOp == undefined || requirement.boolOp == "AND") {
    return (requirement.target <= value);
  } else if (requirement.boolOp == "OR") {
    return true;
  }
};

const checkAchieved = (spec, noPayments, largestPayment) => {
  // one condition is already met at this point
  const paymentsMet = checkRequirement(spec.requirements.noPayments, noPayments);
  const largestMet = checkRequirement(spec.requirements.largestPayment, largestPayment);
  return paymentsMet && largestMet;
};

const filterAchievements = (specs, noPayments, largestPayment) => {
  let achieved = [];
  for (let i = 0; i < specs.length; i++) {
    if (checkAchieved(specs[i], noPayments, largestPayment)) {
      achieved.push(specs[i]);
    }
  }
  return achieved;
};

const findAchievments = async(req) => {
  const payments = await Payment.find({userId: req.user.id});

  const noPayments = payments.length;
  const largestPayment = getLargestPayment(payments);

  const spec1 = await AchievementSpec.find({"requirements.noPayments.target": {$lte: noPayments}});
  const spec2 = await AchievementSpec.find({"requirements.largestPayment.target": {$lte: largestPayment}});

  const specs = spec1.concat(spec2).reduce((acc, doc) => {
    if (!acc.some(item => item._id.equals(doc._id))) {
      acc.push(doc);
    }
    return acc;
  }, []);

  return filterAchievements(specs, noPayments, largestPayment);
};

const detectPaymentAchievements = async(req) => {
  const specs = await findAchievments(req);
  let achievements = [];

  for (let i = 0; i < specs.length; i++) {
    try {
      const achievement =  await Achievement.create({
        userId: req.user.id,
        achievementSpecId: specs[i]._id
      });

      achievements.push(await buildOwnedObject(achievement));
    } catch {
      // ignore
    }
  }

  return achievements;
};

module.exports = {detectPaymentAchievements};