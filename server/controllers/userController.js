// const jwt = require("jsonwebtoken");
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

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  if(user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.json({message: "Registered user"});
});

// @desc    Log in existing user
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  res.json({message: "Logged in user"});
});

// @desc    Get existing user data
// @route   POST /api/user/profile
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  res.json({message: "Retreived user data"});
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
};