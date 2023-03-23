const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, "name must be 3 characters or longer"],
      maxLength: [60, "name must be 60 characters or below"], 
      required: [true, "requires a name"]
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  }
);

module.exports = mongoose.model("Category", categorySchema);