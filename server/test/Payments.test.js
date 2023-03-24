/* eslint-disable no-unused-vars */
const Category = require("../models/categoryModel");
const Payment = require("../models/paymentModel");
const User = require("../models/userModel");

const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

const chaiHttp = require("chai-http");
const app = require("../app");

const jwt = require("jsonwebtoken");
const { get } = require("mongoose");

chai.use(chaiHttp);

describe("Payment tests", () => {

  const flushDB = async () => {
    await Category.deleteMany({});
    await Payment.deleteMany({});
    await User.deleteMany({});
  };// Flush collections from database

  const getUserAndCategory = async () => {
    const user = await User.findOne({name: "Jill"});
    const category = await Category.findOne({name: "Groceries"});
    return {user, category};
  };// Get user and category

  before(async() => {
    // flush DB before tests
    await flushDB();

    // load required objects to database
    const validUser = {
      name: "Jill",
      email: "jill@example.com",
      password: "123"
    };
    const validCategory = {
      name: "Groceries"
    };

    await User.create(validUser)
      .then((user) => {
        Category.create({
          ...validCategory,
          userId: user._id
        });
      });
  });

  after(async() => {
    // flush DB after tests
    await flushDB();
  });

  describe("Model tests", () => {
    it("should save a valid payment", async() => {
      const {user, category} = await getUserAndCategory();

      await Payment.create({
        title: "Carrots",
        description: "A 1kg bag of carrots",
        amount: 2,
        categoryId: category._id,
        userId: user._id
      })
        .catch((error) => {
          should.not.exist(error, "The payment should have been valid");
        })
        .then((payment) => {
          should.exist(payment);
        });
    });

    it("should require a title", async() => {
      const {user, category} = await getUserAndCategory();

      await Payment.create({
        description: "A 1kg bag of carrots",
        amount: 2,
        categoryId: category._id,
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((payment) => {
          should.not.exist(payment, "The payment should have been invalid");
        });      
    });

    it("should require a description", async() => {
      const {user, category} = await getUserAndCategory();

      await Payment.create({
        title: "Carrots",
        amount: 2,
        categoryId: category._id,
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((payment) => {
          should.not.exist(payment, "The payment should have been invalid");
        }); 
    });

    it("should require an amount", async() => {
      const {user, category} = await getUserAndCategory();

      await Payment.create({
        title: "Carrots",
        description: "A 1kg bag of carrots",
        categoryId: category._id,
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((payment) => {
          should.not.exist(payment, "The payment should have been invalid");
        }); 
    });

    it("should require a category", async() => {
      const {user, category} = await getUserAndCategory();

      await Payment.create({
        title: "Carrots",
        description: "A 1kg bag of carrots",
        amount: 2,
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((payment) => {
          should.not.exist(payment, "The payment should have been invalid");
        }); 
    });

    it("should require a user", async() => {
      const {user, category} = await getUserAndCategory();

      await Payment.create({
        title: "Carrots",
        description: "A 1kg bag of carrots",
        amount: 2,
        categoryId: category._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((payment) => {
          should.not.exist(payment, "The payment should have been invalid");
        }); 
    });
  });
});