const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Register new user
// @route   POST /api/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const userExists = await User.findOne({email});

  // Handle already existing user
  
  if(userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try{
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)

    });
  }
  //Catch validation error if form data is invalid
  catch(error) {
    res.status(400);
    throw error;
  }
  
});

// @desc    Log in existing user
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email});
  
  if(user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if(validPassword) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })
        .status(200);
      return;
    }
  }
  
  res.status(401);
  throw new Error("Invalid credentials");
});

// @desc    Get existing user data
// @route   POST /api/user/profile
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email, exp, level } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
    exp, 
    level
  });
});

const increaseLevel = asyncHandler(async (req,res) => {
  try{
    const user = await User.findById(req.user.id);
    const userExp = user.exp + req.body.exp;
    const userLevel = Math.floor(userExp / 100) + 1;

    user.exp = userExp;
    user.level = userLevel;

    await user.save(); 
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
})



// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_VALID_FOR
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  increaseLevel
};