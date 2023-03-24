const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const {
  detectStreakAchievements,
} = require("../util/streakAchievementDetection");

// @desc    Register new user
// @route   POST /api/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const userExists = await User.findOne({ email });

  // Handle already existing user

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (error) {
    //Catch validation error if form data is invalid
    res.status(400);
    throw error;
  }
});

// @desc    Log in existing user
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      res
        .json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        })
        .status(200);
      return;
    }
  }

  res.status(401);
  throw new Error("Invalid credentials");
});

// @desc    Edit user data
// @route   PATCH /api/user/
// @access  Private
const editUser = asyncHandler(async (req, res) => {
  const { name, password, streakSince } = req.body;
  const currentUser = await User.findOne({ _id: req.user.id });

  let salt;
  let hashedPassword = currentUser.password;

  if (password) {
    salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    { name: name, password: hashedPassword, streakSince: streakSince }
  );

  const achievements = await detectStreakAchievements(req);

  res.status(200).json({
    _id: user._id,
    name: user.name,
    achievements: achievements,
  });
});

// @desc    Get existing user data
// @route   GET /api/user/profile
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email, exp, level } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
    exp,
    level,
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_VALID_FOR,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  editUser,
};
