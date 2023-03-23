/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const User = require("../models/userModel.js");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const should = chai.should();

const utils = require("./utils.js");

chai.use(chaiHttp);

const { updateExp } = require("../util/levelsUtil");

// TEST LEVELS AND EXP
describe("Level tests", () => {

  //Flush test database and create mock user
  after(async () => {await utils.flushDB();});

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

  it("should update exp", async () => {
    const beforeUser = await chai.request(app)
      .get("/api/user/profile/")
      .set("Authorization", ("Bearer " + validToken)); 

    const beforeExp = beforeUser.body.exp; 

    const res = await updateExp({user: beforeUser.body, exp: 1});

    res.should.be.a("object"); 
    res.should.have.property("exp").eql(beforeExp + 1);
  }); 

  it("should update level when there is enough exp", async () => {
    const beforeUser = await chai.request(app)
      .get("/api/user/profile/")
      .set("Authorization", ("Bearer " + validToken)); 

      const beforeExp = beforeUser.body.exp; 
  
      const res = await updateExp({user: beforeUser.body, exp: 100});
  
      res.should.be.a("object"); 
      res.should.have.property("exp").eql(beforeExp + 100);
  });  
});