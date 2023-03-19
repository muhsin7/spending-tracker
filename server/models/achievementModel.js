const mongoose = require("mongoose");

<<<<<<< HEAD
const achievementSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    goal: {
      type: Number,
      required: true
    },
    progress: {
      type: Number,
      required: true
    },
    completed: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
=======
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
>>>>>>> 64a90b779f5bb92635a1a326fe18dc0b9d7b653d
    }
  }
);

<<<<<<< HEAD
module.exports = mongoose.model("Achievement", achievementSchema);
=======
module.exports = mongoose.model("Achievement", achievementModelSchema);
>>>>>>> 64a90b779f5bb92635a1a326fe18dc0b9d7b653d
