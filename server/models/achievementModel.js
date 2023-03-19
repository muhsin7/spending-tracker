const mongoose = require("mongoose");

// This model links users to achievements they have obtained
const achievementModelSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    achievementId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "AchievementRequirement"
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
      immutable: true
    }
  }
);

module.exports = mongoose.model("Achievement", achievementModelSchema);
