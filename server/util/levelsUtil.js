const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const updateExp = async(req) => {
  try{
    // Gets the user, their current exp and level
    const user = await User.findById(req.user.id);
    const userExp = user.exp + req.exp;
    const userLevel = Math.floor(userExp / 100) + 1;

    // Update the user's exp and level
    user.exp = userExp;
    user.level = userLevel;

    await user.save(); 
    
    return user;
  } catch (error) {
    // ignore
  }
};
  

module.exports = { updateExp };