const mongoose = require("mongoose");

const checkIsCategoryAchievement = (object) => {
  return object.noCategories != null;
};

const checkIsPaymentAchievement = (object) => {
  return object.noPayments != null || object.largestPayment != null;
};

const checkIsStreakAchievement = (object) => {
  return object.underLimitStreak != null;
};

const achievementSpecSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    immutable: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    immutable: true,
  },
  type: {
    type: String,
    immutable: true,
  },
  exp: {
    type: Number,
    required: true,
    immutable: true,
  },
  requirements: {
    /*
    requitements:
      requirement: {
        target: Number
      },
      boolOp: {
        type: String,
        enum ["AND", "OR"]
      }
    */
    type: mongoose.Schema.Types.Mixed,
    required: true,
    immutable: true,
    unique: true,
    validate: {
      validator: (value) => {
        return (
          checkIsCategoryAchievement(value) ||
          checkIsPaymentAchievement(value) ||
          checkIsStreakAchievement(value)
        );
      },
      message: "Invalid achievement requirements",
    },
  },
});

achievementSpecSchema.pre("save", async function (next) {
  if (checkIsCategoryAchievement(this.requirements)) {
    this.type = "category";
  } else if (checkIsPaymentAchievement(this.requirements)) {
    this.type = "payment";
  } else if (checkIsStreakAchievement(this.requirements)) {
    this.type = "streak";
  }
  next();
});

module.exports = mongoose.model("AchievementSpec", achievementSpecSchema);
