/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const User = require("../models/userModel.js");
const Category = require("../models/categoryModel.js");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const should = chai.should();

chai.use(chaiHttp);

// TEST CATEGORY API
describe("Category tests", () => {
  before(async() => {
    // flush DB before tests
    await Category.deleteMany({});
    await User.deleteMany({});

    // load required objects to database
    const USER = {
      name: "John",
      email: "johndoe@example.com",
      password: "password"
    };

    await User.create(USER);
  })

  beforeEach(async() => {
    // flush categories
    await Category.deleteMany({});

    const USER = await User.findOne({name:"John"});

    await Category.create({
      name: "Groceries",
      userId: USER._id
    })
  });

  after(async() => {
    // flush DB after tests
    await Category.deleteMany({});
    await User.deleteMany({});
  });
});
