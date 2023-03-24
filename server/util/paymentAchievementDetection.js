const Payment = require("../models/paymentModel");
const Achievement = require("../models/achievementModel");
const AchievementSpec = require("../models/achievementSpecModel");
const {buildOwnedObject} = require("./achievementFormatting");
const { updateExp } = require("./levelsUtil");

const getLargestPayment = (payments) => {
  const largestPaymentObj = payments.reduce((prev, current) => {
    return (prev.amount > current.amount) ? prev : current;
  });
  return largestPaymentObj.amount;
};

const checkRequirement = (requirement, value) => {
  if (requirement == undefined) return true;
  return (requirement.target <= value);
};

const checkAchieved = (spec, noPayments, largestPayment) => {
  // one condition is already met at this point
  const paymentsMet = checkRequirement(spec.requirements.noPayments, noPayments);
  const largestMet = checkRequirement(spec.requirements.largestPayment, largestPayment);

  if (spec.requirements.boolOp == undefined || spec.requirements.boolOp == "AND") {
    return paymentsMet && largestMet;
  } else {
    return paymentsMet || largestMet;
  }
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
  if (payments.length == 0) return [];

  const noPayments = payments.length;
  const largestPayment = getLargestPayment(payments);

  const specs = await AchievementSpec.find({type: "payment"});

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

      await updateExp({user: req.user, exp: specs[i].exp});

      achievements.push(await buildOwnedObject(achievement));
    } catch {
      // ignore
    }
  }

  return achievements;
};

module.exports = {detectPaymentAchievements};