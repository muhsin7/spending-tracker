const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  title: {
    type: String,
    minLength: [3, "title must be 3 characters or longer"],
    maxLength: [60, "title must be 60 characters or below"], 
    required: [true, "requires a title"],
    trim: true
  },
  description: {
    type: String,
    minLength: [3, "description must be 3 characters or longer"],
    maxLength: [300, "description must be 300 characters or below"], 
    required: [true, "requires a description"],
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  image: {
    data: Buffer,
    contentType: String
  },
  amount: {
    type: Number,
    required: [true, "requires an amount"],
    validate: {
      validator: function(value) {
        return value > 0;
      },
      message: "amount must be a positive number"
    }
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "requires a categoryId"]
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "requires a userId"]
  }
}, {timestamps: true});

module.exports = mongoose.model("Payment", paymentSchema);