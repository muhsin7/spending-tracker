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
  beforeEach(async () => {
    await utils.flushDB();
    await User.create({
      name: "Jill",
      email: "jill@example.com",
      password: "123"
    });
  });

  //Registration tests
  describe("Registration", () => {

    it("Register a valid user", async () => {
      let validUser = {
        name: "John",
        email: "john@example.com",
        password: "123"
      };

      const res = await chai.request(app)
        .post("/api/user/")
        .send(validUser);
      
      res.should.have.status(201);
      res.body.should.be.a("object");
      res.body.should.have.property("_id");
      res.body.should.have.property("name").eql(validUser.name);
      res.body.should.have.property("email").eql(validUser.email);
      res.body.should.have.property("token");
    });

    it("Register a user without an email", async () => {
      let noEmailUser = {
        name: "John",
        password: "123"
      };

      const res = await chai.request(app)
        .post("/api/user/")
        .send(noEmailUser);
      
      utils.assertError(res);
    });

    it("Register a user with an existing email", async () => {
      let existingEmailUser = {
        name: "John",
        email: "jill@example.com",
        password: "123"
      };

      const res = await chai.request(app)
        .post("/api/user/")
        .send(existingEmailUser);
      
      utils.assertError(res);
    });

    it("Register a user with a username that is too long", async () => {
      let longNameUser = {
        name: "a".repeat(21),
        email: "john@example.com",
        password: "123"
      };

      const res = await chai.request(app)
        .post("/api/user/")
        .send(longNameUser);
      
      utils.assertError(res);
    });

    it("Register a user with a username that is too short", async () => {
      let shortNameUser = {
        name: "a",
        email: "john@example.com",
        password: "123"
      };

      const res = await chai.request(app)
        .post("/api/user/")
        .send(shortNameUser);
      
      utils.assertError(res);
    });

    it("Register a user with an invalid email", async () => {
      let invalidEmailUser = {
        name: "John",
        email: "johnexample.com",
        password: "123"
      };

      const res = await chai.request(app)
        .post("/api/user/")
        .send(invalidEmailUser);
      
      utils.assertError(res);
    });
  });
});

// No name (fail)

// No password (fail)

// Email too long (fail)


// // LOGIN

// Valid login (success)

// No email (fail)

// No password (fail)

// Invalid password (fail)


// // GET PROFILE

// Valid get (success)

// Invalid JWT (fail)

// Expired JWT
