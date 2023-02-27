const mongoose = require("mongoose");

const durationSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["YEAR", "MONTH", "DAY", "WEEK"],
    required: true,
  },
});

const spendingLimitSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  amount: {
    type: Number,
    required: true,
  },
  duration: {
    type: durationSchema,
    required: true,
  },
  category: {
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }
});

module.exports = mongoose.model("SpendingLimit", spendingLimitSchema);
