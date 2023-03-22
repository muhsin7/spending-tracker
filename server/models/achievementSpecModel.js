const mongoose = require("mongoose");

/*
  Achievement requirements will be as follows:

  target: {
    type: Number
  },
  boolOp: {
    type: String,
    enum: ["AND", "OR"],
    default: "AND"
  }
*/

const checkIsCategoryAchievement = (object) => {
  return (object.noCategories != null 
    || object.paymentsInCategory != null);
};

const checkIsPaymentAchievement = (object) => {
  return (object.noPayments != null 
    || object.largestPayment != null
    || object.perYear != null
    || object.perMonth != null
    || object.perWeek != null
    || object.perDay  != null);
};

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
    unique: true,
    validate: {
      validator: (value) => {
        return checkIsCategoryAchievement(value) || checkIsPaymentAchievement(value) || checkIsLimitAchievement(value);
      },
      message: "Invalid achievement requirements"
    }
  }
});

achievementSpecSchema.pre("save", async function(next) {
  if (checkIsCategoryAchievement(this.requirements)) {
    this.type = "category";

  } else if (checkIsPaymentAchievement(this.requirements)) {
    this.type = "payment";

  } else if (checkIsLimitAchievement(this.requirements)) {
    this.type = "limit";

  } else {
    throw new Error("Invalid achievement type");
  }
  next();
});

module.exports = mongoose.model("AchievementSpec", achievementSpecSchema);