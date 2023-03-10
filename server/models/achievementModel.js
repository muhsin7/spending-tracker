const mongoose = require("mongoose");

const achievementSchema = mongoose.Schema(
  {
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
      required,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  }
);

module.exports = mongoose.model("Achievement", achievementSchema);