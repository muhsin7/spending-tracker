/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const User = require("../models/userModel.js");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const should = chai.should();

const utils = require("./utils.js");

chai.use(chaiHttp);

//TEST USER API

describe("User tests", () => {
  
  //Flush test database and create mock user

  after(async () => {await utils.flushDB();});

  describe("Model tests", () => {
    let defaultUser;

    beforeEach(async () => {
      await utils.flushDB();
      defaultUser = await User.create({
        name: "Jill",
        email: "jill@example.com",
        password: "123"
      });
    });

    it("should create and save a valid user", async () => {
      await User.create({
        name: "John",
        email: "john@example.com",
        password: "123"
      })
        .catch((error) => {
          should.not.exist(error, "The user should have been valid");
        })
        .then((user) => {
          should.exist(user);
        });
    });

    it("should require name", async () => {
      await User.create({
        email: "john@example.com",
        password: "123"
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((user) => {
          should.not.exist(user, "The user should have been invalid");
        });
    });

    it("should require email", async () => {
      await User.create({
        name: "John",
        password: "123"
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((user) => {
          should.not.exist(user, "The user should have been invalid");
        });
    });

    it("should require password", async () => {
      await User.create({
        name: "John",
        email: "john@example.com"
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((user) => {
          should.not.exist(user, "The user should have been invalid");
        });
    });

    it("should not allow names under 3 characters", async () => {
      await User.create({
        name: "Jo",
        password: "123",
        email: "john@example.com"
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((user) => {
          should.not.exist(user, "The user should have been invalid");
        });
    });

    it("should not allow names above 20 characters", async () => {
      await User.create({
        name: "J".repeat(21),
        password: "123",
        email: "john@example.com"
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((user) => {
          should.not.exist(user, "The user should have been invalid");
        });
    });

    it("should not allow emails not in correct format", async () => {
      await User.create({
        name: "John",
        password: "123",
        email: "johnexample.com"
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((user) => {
          should.not.exist(user, "The user should have been invalid");
        });
    });

    it("should not allow emails above 254 characters", async () => {
      await User.create({
        name: "John",
        password: "123",
        email: "j".repeat(250) + "@example.com"
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((user) => {
          should.not.exist(user, "The user should have been invalid");
        });
    });

    it("should not allow a non-unique eamil", async () => {
      await User.create({
        name: "John",
        password: "123",
        email: "jill@example.com"
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("MongoServerError");
        })
        .then((user) => {
          should.not.exist(user, "The user should have been invalid");
        });
    });

  });

  describe("API tests", () => {
    it("should register a valid user through POST");
    it("should not register a user that does not conform to the model");
  });
  
});


// // LOGIN

// Valid login (success)

// No email (fail)

// No password (fail)

// Invalid password (fail)


// // GET PROFILE

// Valid get (success)

// Invalid JWT (fail)

// Expired JWT
