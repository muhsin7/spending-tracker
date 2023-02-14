const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, "Username must be 3 characters or longer"],
      maxLength: [20, "Username must be 20 characters or below"], 
      required: [true, "Please add a username"]
    },
    email: {
      type: String,
      validate: {
        validator: function(v) {
          return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v);
        },
        message: props => `${props.value} is not a valid email address`
      },
      maxLength:[254, "Email address is too long"],
      unique: true,
      required: [true, "Please add an email"]
    },
    password: {
      type: String,
      required: [true, "Please add a password"] 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
