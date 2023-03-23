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
    || object.largestPayment != null);
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
    enum: ["category, payment"],
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
        return checkIsCategoryAchievement(value) || checkIsPaymentAchievement(value);
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
  }
  next();
});

module.exports = mongoose.model("AchievementSpec", achievementSpecSchema);