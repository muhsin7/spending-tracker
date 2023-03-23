/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const User = require("../models/userModel.js");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const should = chai.should();

chai.use(chaiHttp);
console.log(process.env);

if (process.env.DB_URI) {
  console.log("There is a DB URI registered");
}
else {
  console.log("There is no DB URI registered");
}


//TEST USER API
describe("User tests", () => {
  
  //Flush test database and create mock user
  beforeEach((done) => {
    User.remove({}, () => {
      User.create({
        name: "Jill",
        email: "jill@example.com",
        password: "123"
      }, () => {done();});
    });
    
  });

  //Registration tests
  describe("Registration", () => {

    it("Register a valid user", (done) => {
      let validUser = {
        name: "John",
        email: "john@example.com",
        password: "123"
      };

      chai
        .request(app)
        .post("/api/user/")
        .send(validUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("name").eql(validUser.name);
          res.body.should.have.property("email").eql(validUser.email);
          res.body.should.have.property("token");
        });
      
      done();
    });

    it("Register a user without an email", (done) => {
      let noEmailUser = {
        name: "John",
        password: "123"
      };

      chai
        .request(app)
        .post("/api/user/")
        .send(noEmailUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.should.have.property("message");
          res.body.should.have.property("status");
          done();
        });
        
      
    });

    it("Register a user with an existing email", (done) => {
      let existingEmailUser = {
        name: "John",
        email: "jill@example.com",
        password: "123"
      };

      chai
        .request(app)
        .post("/api/user/")
        .send(existingEmailUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.should.have.property("message");
          res.body.should.have.property("status");
          done();
        });
        
      
    });

    it("Register a user with a username that is too long", (done) => {
      let longNameUser = {
        name: "a".repeat(21),
        email: "john@example.com",
        password: "123"
      };

      chai
        .request(app)
        .post("/api/user/")
        .send(longNameUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.should.have.property("message");
          res.body.should.have.property("status");
          done();
        });
        
      
    });

    it("Register a user with a username that is too short", (done) => {
      let longNameUser = {
        name: "a",
        email: "john@example.com",
        password: "123"
      };

      chai
        .request(app)
        .post("/api/user/")
        .send(longNameUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.should.have.property("message");
          res.body.should.have.property("status");
          done();
        });
    });

    it("Register a user with an invalid email", (done) => {
      let longNameUser = {
        name: "John",
        email: "johnexample.com",
        password: "123"
      };

      chai
        .request(app)
        .post("/api/user/")
        .send(longNameUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.should.have.property("message");
          res.body.should.have.property("status");
          done();
        });
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
