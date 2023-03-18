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
  },
};

const categoryAchievementSchema = mongoose.Schema({
  noCategories: {type: REQUIREMENT,required: false},
  paymentsInCategory: {type: REQUIREMENT,required: false},
});

const checkIsCategoryAchievement = (object) => {
  return (object.noCategories != null 
    || object.paymentsInCategory != null);
};

const paymentAchievementSchema = mongoose.Schema({
  noPayments: {type: REQUIREMENT,required: false},
  largestPayment: {type: REQUIREMENT,required: false},
  perYear: {type: REQUIREMENT,required: false},
  perMonth: {type: REQUIREMENT,required: false},
  perWeek: {type: REQUIREMENT,required: false},
  perDay: {type: REQUIREMENT,required: false}
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
  limitsSet: {type: REQUIREMENT,required: false},
  limitsMetStreak: {type: REQUIREMENT,required: false},
  limitsMet: {type: REQUIREMENT,required: false}
});

const checkIsLimitAchievement = (object) => {
  return (object.limitsSet != null 
    || object.limitsMetStreak != null
    || object.limitsMet != null);
};

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

achievementSpecSchema.pre("save", async function(next) {
  if (checkIsCategoryAchievement(this.requirements)) {
    this.type = "category";
    this.requirements = new categoryAchievementSchema(this.requirements);

  } else if (checkIsPaymentAchievement(this.requirements)) {
    this.type = "payment";
    this.requirements = new paymentAchievementSchema(this.requirements);

  } else if (checkIsLimitAchievement(this.requirements)) {
    this.type = "limit";
    this.requirements = new limitAchievementSchema(this.requirements);

  } else {
    throw new Error("Invalid achievement type");
  }

  console.log("reached");
  next();
});

module.exports = mongoose.model("AchievementSpec", achievementSpecSchema);