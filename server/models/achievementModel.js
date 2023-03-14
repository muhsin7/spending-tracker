const mongoose = require("mongoose");

// This model links users to achievements they have obtained
const achievementModelSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    achievementId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
      immutable: true
    }
  }
);

module.exports = mongoose.model("achievement", achievementModelSchema);