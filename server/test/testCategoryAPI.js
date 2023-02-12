/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const User = require("../models/userModel.js");
const Category = require("../models/categoryModel.js");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const should = chai.should();

chai.use(chaiHttp);

//TEST CATEGORY API
describe("Category tests", () => {
  
  //Flush test database and create mock category
  beforeEach((done) => {
    Category.remove({}, () => {
      const USER = User({
        name: "John",
        email: "johndoe@example.com",
        password: "password"
      });
      
      Category.create({
        name: "Food",
        userId: USER
      }, () => {});
    });
    done();
  });
});
