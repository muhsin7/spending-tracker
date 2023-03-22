const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const updateExp = async(req) => {
  try{
    const user = await User.findById(req.user.id);
    const userExp = user.exp + req.exp;
    const userLevel = Math.floor(userExp / 100) + 1;

    user.exp = userExp;
    user.level = userLevel;

    await user.save(); 
    
    return user;
  } catch (error) {
    
  }
};
  

module.exports = { updateExp };