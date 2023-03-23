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

    it("should not require exp", async () => {
      await User.create({
        name: "John",
        password: "123",
        email: "john@example.com"
      })
        .catch((error) => {
          should.not.exist(error, "The user should have been valid");
        })
        .then((user) => {
          should.exist(user);
          user.should.have.property("exp");
        });
    });

    it("should set exp to the default value", async() => {
      await User.create({
        name: "John",
        password: "123",
        email: "john@example.com"
      })
        .catch((error) => {
          should.not.exist(error, "The user should have been valid");
        })
        .then((user) => {
          should.exist(user);
          user.should.have.property("exp").eql(0);
        });
    });

    it("should not require level", async () => {
      await User.create({
        name: "John",
        password: "123",
        email: "john@example.com"
      })
        .catch((error) => {
          should.not.exist(error, "The user should have been valid");
        })
        .then((user) => {
          should.exist(user);
          user.should.have.property("level");
        });
    });

    it("should set level to the default value", async() => {
      await User.create({
        name: "John",
        password: "123",
        email: "john@example.com"
      })
        .catch((error) => {
          should.not.exist(error, "The user should have been valid");
        })
        .then((user) => {
          should.exist(user);
          user.should.have.property("level").eql(1);
        });
    });
  });

  describe("API tests", () => {
    let validToken;
    const defaultUser = {
      name: "Jill",
      email: "jill@example.com",
      password: "123"
    };
    
    before(async () => {
      await utils.flushDB();
      const res = await chai.request(app)
        .post("/api/user/")
        .send(defaultUser);
      
      validToken = res.body.token;
    });

    it("should register a valid user through POST /api/user", async () =>  {
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

    it("should not register a user that does not conform to the model", async () => {
      let noEmailUser = {
        name: "John",
        password: "123"
      };

      const res = await chai.request(app)
        .post("/api/user/")
        .send(noEmailUser);
      
      utils.assertError(res, 400);
    });

    it("should login a user with correct credentials through POST /api/user/login", async () => {
      let validUser = {
        email: "jill@example.com",
        password: "123"
      };

      const res = await chai.request(app)
        .post("/api/user/login/")
        .send(validUser);
      
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("_id");
      res.body.should.have.property("name").eql(defaultUser.name);
      res.body.should.have.property("email").eql(defaultUser.email);
      res.body.should.have.property("token");
    });
    it("should not login a user with the incorrect credentials", async () => {
      let invalidUser = {
        email: "jill@example.com",
        password: "1234"
      };

      const res = await chai.request(app)
        .post("/api/user/login/")
        .send(invalidUser);
      
      utils.assertError(res, 401);
    });
    it("should not login a user with a malformed request", async () => {
      let invalidUser = {
        password: "1234"
      };

      const res = await chai.request(app)
        .post("/api/user/login/")
        .send(invalidUser);
      
      utils.assertError(res, 401);
    });
    it("should provide an authorised user with their own profile", async () => {
      const res = await chai.request(app)
        .get("/api/user/profile/")
        .set("Authorization", ("Bearer " + validToken));
      
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("id");
      res.body.should.have.property("name").eql(defaultUser.name);
      res.body.should.have.property("email").eql(defaultUser.email);
    });
    it("should not provide a user without a bearer token a profile", async() =>  {
      const res = await chai.request(app)
        .get("/api/user/profile/");
      
      utils.assertError(res, 401);
    });
    it("should not allow a user with an invalid bearer token a profile", async () => {
      const res = await chai.request(app)
        .get("/api/user/profile/")
        .set("Authorization", ("Bearer xyz"));
      
      utils.assertError(res, 401);
    });

    it("should not provide a user with an expired token their profile"); 

    it("should update exp", async () => {
      const beforeUser = await chai.request(app)
        .get("/api/user/profile/")
        .set("Authorization", ("Bearer " + validToken)); 

      const beforeExp = beforeUser.body.exp; 
      const res = await chai.request(app)
        .patch("/api/user/exp")
        .send({exp: 1})
        .set("Authorization", ("Bearer " + validToken));
        
      res.should.have.status(200);
      res.body.should.be.a("object"); 
      res.body.should.have.property("exp").eql(beforeExp + 1);
    }); 

    it("should update level when there is enough exp", async () => {
      const beforeUser = await chai.request(app)
        .get("/api/user/profile/")
        .set("Authorization", ("Bearer " + validToken)); 

      const beforeLevel = beforeUser.body.level; 
      const res = await chai.request(app)
        .patch("/api/user/exp")
        .send({exp: 100})
        .set("Authorization", ("Bearer " + validToken));

      res.should.have.status(200);
      res.body.should.be.a("object"); 
      res.body.should.have.property("level").eql(beforeLevel + 1);
    }); 
  });
  
});
