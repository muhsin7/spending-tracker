const Category = require("../models/categoryModel");
const User = require("../models/userModel");
const SpendingLimit = require("../models/spendingLimitModel");

const {flushDB, assertError, generateToken} = require("./utils");

const chai = require("chai");
const should = chai.should();

const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);

describe("Spending Limit tests", () => {
  before(async() => {
    // flush DB before tests
    await flushDB();

    // load required objects to database
    const USER = {
      name: "Jill",
      email: "jill@example.com",
      password: "123"
    };
    const CATEGORY = {
      name: "Groceries"
    };

    await User.create(USER)
      .then(async(user) => {
        await Category.create({
          ...CATEGORY,
          userId: user._id
        });
      });
  });

  after(flushDB);

  // TEST MODELS

  describe("Spending Model tests", () => {
    let user;
    let category;

    beforeEach(async() => {
      //flush payments
      await SpendingLimit.deleteMany({});

      user = await User.findOne({name: "Jill"});
      category = await Category.findOne({name: "Groceries"});
    });

    it("should save a valid spending limit", async() => {
      await SpendingLimit.create({
        name: "grocery limit",
        amount: 2,
        duration: {type: "WEEK"},
        userId: user._id,
        category: category._id
      })
        .catch((error) => {
          should.not.exist(error, "The spending limit should have been valid");
        })
        .then((spendingLimit) => {
          should.exist(spendingLimit);
        });
    });

    it("should require a name", async() => {
      await SpendingLimit.create({
        amount: 2,
        duration: "WEEK",
        category: category._id,
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((spendingLimit) => {
          should.not.exist(spendingLimit, "The spending limit should have been invalid");
        });      
    });

    it("should require an amount", async() => {
      await SpendingLimit.create({
        name: "travel",
        duration: "WEEK",
        category: category._id,
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((spendingLimit) => {
          should.not.exist(spendingLimit, "The spending limit should have been invalid");
        }); 
    });

    it("should require an duration", async() => {
      await SpendingLimit.create({
        title: "Travel",
        amount: 15,
        category: category._id,
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((spendingLimit) => {
          should.not.exist(spendingLimit, "The spending limit should have been invalid");
        }); 
    });

    it("should not require a category", async() => {
      await SpendingLimit.create({
        name: "grocery limit",
        amount: 15,
        duration: {type: "WEEK"},
        userId: user._id
      })
        .catch((error) => {
          should.not.exist(error, "The spending limit should have been valid");
        })
        .then((spendingLimit) => {
          should.exist(spendingLimit);
        });
    });

    it("should require a user", async() => {
      await SpendingLimit.create({
        name: "travel",
        amount: 15,
        duration: "WEEK"
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((spendingLimit) => {
          should.not.exist(spendingLimit, "The payment should have been invalid");
        }); 
    });
  });

  // TEST ROUTING & CONTROLLERS

  describe("API tests", () => {
    let user;
    let category;
    let spendingLimit;
    let authToken;

    let otherUser;
    let otherCategory;
    let otherSpendingLimit;

    const genSpendingLimit = async() => {
      user = await User.findOne({name: "Jill"});
      category = await Category.findOne({name: "Groceries"});
      return {
        name: "grocery limit",
        amount: 2,
        duration: {type: "WEEK"},
        userId: user._id,
        category: category._id
      };
    };

    before(async() => {
      // set up other user , their category and payments
      const USER = {
        name: "John",
        email: "John@example.com",
        password: "123"
      };

      const CATEGORY = {
        name: "Parties"
      };

      await User.create({...USER}).then(async(user) => {
        await Category.create({...CATEGORY, userId: user._id});
      });
    });

    beforeEach(async() => {
      //flush payments
      await SpendingLimit.deleteMany({});

      //get users and categories
      user = await User.findOne({name: "Jill"});
      category = await Category.findOne({name: "Groceries"});
      otherUser = await User.findOne({name: "John"});
      otherCategory = await Category.findOne({name: "Parties"});
      authToken = generateToken(user);

      // spending limit belonging to the other user
      const OTHER_SPENDING_LIMIT = {
        name: "Party limit",
        amount: 50,
        duration: {type: "WEEK"}
      };
      otherSpendingLimit = await SpendingLimit.create({...OTHER_SPENDING_LIMIT, userId: otherUser._id, category: otherCategory._id});

      // add a spending limit to the user
      const SPENDING_LIMIT = {
        name: "Grocery limit",
        amount: 20,
        duration: {type: "WEEK"}
      };
      spendingLimit = await SpendingLimit.create({...SPENDING_LIMIT, userId: user._id, category: category._id});
    });

    it("should require a logged in user", async() => {
      const res = await chai.request(app)
        .get("/api/limit/");
      assertError(res, 401);
    });

    it("should get spending limits belonging to the user", async() => {
      const res = await chai.request(app)
        .get("/api/limit/")
        .set("Authorization", ("Bearer " + authToken));
        
      res.should.have.status(200);
      res.should.have.property("body");
      should.exist(res.body, "Should have gotten an array of spending limits");
      res.body.length.should.equal(1, "Should have only received one spending limit");
      res.body[0].should.have.property("name", spendingLimit.name);
      res.body[0].should.have.property("duration");
      res.body[0].should.have.property("amount", spendingLimit.amount);
    });

    it("should not allow the user to create a spending limit in a category they do not own", async() => {
      const initSpendingLimits = await SpendingLimit.countDocuments();
      let spendingLimit = await genSpendingLimit();
      spendingLimit.category = otherCategory._id;
      
      const res = await chai.request(app)
        .post("/api/limit/")
        .send(spendingLimit)
        .set("Authorization", ("Bearer " + authToken));

      const spendingLimits = await SpendingLimit.countDocuments();
      assertError(res, 403);
      spendingLimits.should.be.equal(initSpendingLimits);
    });

    it("should post a valid spending limit", async() => {
      const initSpendingLimits = await SpendingLimit.countDocuments();

      //Make another category because only 1 spending limit is allowed per category
      const newCategory = await Category.create({name: "New category", userId: user._id});
      const newSpendingLimit = await genSpendingLimit();
      newSpendingLimit.category = newCategory._id;

      const res = await chai.request(app)
        .post("/api/limit/")
        .send(newSpendingLimit)
        .set("Authorization", ("Bearer " + authToken));

      const spendingLimits = await SpendingLimit.countDocuments();
      spendingLimits.should.be.equal(initSpendingLimits + 1);
      res.should.have.status(201);
      res.should.have.property("body");
      res.body.should.have.property("name", "grocery limit");
      res.body.should.have.property("amount", 2);
      res.body.should.have.property("duration");
    });


    it("should get a specific spending limit", async() => {
      const res = await chai.request(app)
        .get("/api/limit/" + spendingLimit._id)
        .set("Authorization", ("Bearer " + authToken));

      res.should.have.status(200);
      res.should.have.property("body");
      should.exist(res.body, "Should have gotten a spending limit");
      res.body[0].should.have.property("name", spendingLimit.name);
      res.body[0].should.have.property("duration");
      res.body[0].should.have.property("amount", spendingLimit.amount);
    });

    it("should prevent the user from getting a spending limit of a different user", async() => {
      const res = await chai.request(app)
        .get("/api/limit/" + otherSpendingLimit._id)
        .set("Authorization", ("Bearer " + authToken));

      assertError(res, 403);
    });

    it("should delete a specified spending limit", async() => {
      const res = await chai.request(app)
        .delete("/api/limit/" + spendingLimit._id)
        .set("Authorization", ("Bearer " + authToken));
      res.should.have.status(200);

      const resPost = await chai.request(app)
        .get("/api/limit/" + spendingLimit._id)
        .set("Authorization", ("Bearer " + authToken));
      assertError(resPost, 404);
    });

    it("should prevent the user from deleting another user's spending limit", async() => {
      const res = await chai.request(app)
        .delete("/api/limit/" + otherSpendingLimit._id)
        .set("Authorization", ("Bearer " + authToken));
      assertError(res, 403);

      // other spending limit should still exist
      const resPost = await chai.request(app)
        .get("/api/limit/" + otherSpendingLimit._id)
        .set("Authorization", ("Bearer " + generateToken(otherUser)));

      resPost.should.have.status(200);
      resPost.should.have.property("body");
      should.exist(resPost.body, "Should have gotten a spending limit");
      resPost.body[0].should.have.property("name", otherSpendingLimit.name);
      resPost.body[0].should.have.property("duration");
      resPost.body[0].should.have.property("amount", otherSpendingLimit.amount);
    });

    it("should update a specified spending limit", async() => {
      const res = await chai.request(app)
        .patch("/api/limit/" + spendingLimit._id)
        .send(await genSpendingLimit())
        .set("Authorization", ("Bearer " + authToken));

      // should return spending limit before updating
      res.should.have.status(200);
      res.should.have.property("body");
      res.body.should.have.property("name", spendingLimit.name);
      res.body.should.have.property("duration");
      res.body.should.have.property("amount", spendingLimit.amount);

      // should return newly updated spending limit
      const resPost = await chai.request(app)
        .get("/api/limit/" + spendingLimit._id)
        .set("Authorization", ("Bearer " + authToken));

      resPost.should.have.status(200);
      resPost.should.have.property("body");
      resPost.body[0].should.have.property("name", "grocery limit");
      resPost.body[0].should.have.property("duration");
      resPost.body[0].should.have.property("amount", 2);
    });

    it("should prevent the user from modifying another user's spending limit", async() => {
      const res = await chai.request(app)
        .patch("/api/limit/" + otherSpendingLimit._id)
        .send(await genSpendingLimit())
        .set("Authorization", ("Bearer " + authToken));
      assertError(res, 403);

      // should not have modified the other user's spending limit
      const resPost = await chai.request(app)
        .get("/api/limit/" + otherSpendingLimit._id)
        .set("Authorization", ("Bearer " + generateToken(otherUser)));

      resPost.should.have.status(200);
      resPost.should.have.property("body");
      resPost.body[0].should.have.property("name", otherSpendingLimit.name);
      resPost.body[0].should.have.property("duration");
      resPost.body[0].should.have.property("amount", otherSpendingLimit.amount);
    });
  });
});