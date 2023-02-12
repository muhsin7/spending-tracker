const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  title: {
    type: String,
    rquired: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model("Payment", paymentSchema);