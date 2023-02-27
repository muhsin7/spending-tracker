/* eslint-disable no-unused-vars */
const Category = require("../models/categoryModel");
const Payment = require("../models/paymentModel");
const User = require("../models/userModel");

const {flushDB} = require("./utils");

const chai = require("chai");
const should = chai.should();

const chaiHttp = require("chai-http");
const app = require("../app");

const jwt = require("jsonwebtoken");

chai.use(chaiHttp);

describe("Payment tests", () => {
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
    let user;
    let category;

    beforeEach(async() => {
      //flush payments
      await Payment.deleteMany({});

      user = await User.findOne({name: "Jill"});
      category = await Category.findOne({name: "Groceries"});
      
    });

    it("should save a valid payment", async() => {
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

  describe("API tests", () => {
    it("should require a logged in user to create a payment");
    it("should not allow the user to create a payment in a category they do not own");
    it("should post a valid payment");
    it("should require a logged in user to get payments");
    it("should get payments");
    it("should only get payments belonging to the user");
    it("should require a logged in user to get a specific payment");
    it("should get a specific payment");
    it("should prevent the user from getting a payment of a different user");
    it("should require a logged in user to delete a payment");
    it("should delete a specified payment");
    it("should prevent the user from deleting another user's payment");
    it("should require a logged in user to update a payment");
    it("should update a specified payment");
    it("should prevent the user from modifying another user's payment");
  });
});