const mongoose = require("mongoose");

const REQUIREMENT = {
  target: {
    type: Number,
    required: true,
    immutable: true
  },
  boolOp: {
    type: String,
    enum: ["AND", "OR"],
    default: "AND",
    immutable: true
  }
};

const categoryAchievementSchema = mongoose.Schema({
  noCategories: REQUIREMENT,
  paymentsInCategory: REQUIREMENT,
});

const checkIsCategoryAchievement = (object) => {
  return (object.noCategories != null 
    || object.paymentsInCategory != null);
};

const paymentAchievementSchema = mongoose.Schema({
  noPayments: REQUIREMENT,
  largestPayment: REQUIREMENT,
  perYear: REQUIREMENT,
  perMonth: REQUIREMENT,
  perWeek: REQUIREMENT,
  perDay: REQUIREMENT
});

const checkIsPaymentAchievement = (object) => {
  return (object.noPayments != null 
    || object.largestPayment != null
    || object.perYear != null
    || object.perMonth != null
    || object.perWeek != null
    || object.perDay  != null);
};

const limitAchievementSchema = mongoose.Schema({
  limitsSet: REQUIREMENT,
  limitsMetStreak: REQUIREMENT,
  limitsMet: REQUIREMENT
});

const checkIsLimitAchievement = (object) => {
  return (object.limitsSet != null 
    || object.limitsMetStreak != null
    || object.limitsMet != null);
};

const categoryAchievementModel = mongoose.model("categoryAchievement", categoryAchievementSchema);
const paymentAchievementModel = mongoose.model("paymentAchievement", paymentAchievementSchema);
const limitAchievementModel = mongoose.model("limitAchievement", limitAchievementSchema);

const achievementSpecSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    immutable: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    immutable: true
  },
  type: {
    type: String,
    enum: ["category, payment, limit"],
    immutable: true
  },
  exp: {
    type: Number,
    required: true,
    immutable: true
  },
  requirements: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    immutable: true,
    validate: {
      validator: (value) => {
        return checkIsCategoryAchievement(value) || checkIsPaymentAchievement(value) || checkIsLimitAchievement(value);
      },
      message: "Invalid achievement type"
    }
  }
});

achievementSpecSchema.pre("save", (next) => {
  if (this.requirements instanceof categoryAchievementModel) {
    this.type = "category";

  } else if (this.requirements instanceof paymentAchievementModel) {
    this.type = "payment";

  } else if (this.requirements instanceof limitAchievementModel) {
    this.type = "limit";
  }
  next();
});

module.exports = mongoose.model("AchievementSpec", achievementSpecSchema);