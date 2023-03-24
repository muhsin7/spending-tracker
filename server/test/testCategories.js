const Category = require("../models/categoryModel");
const User = require("../models/userModel");
const SpendingLimit = require("../models/spendingLimitModel");

const {flushDB, assertError, generateToken} = require("./utils");

const chai = require("chai");
const should = chai.should();

const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);

describe("Category tests", () => {
  before(async() => {
    // flush DB before tests
    await flushDB();

    // load required objects to database
    const USER = {
      name: "Jill",
      email: "jill@example.com",
      password: "123"
    };

    await User.create(USER);
  });

  after(flushDB);

  // TEST MODEL

  describe("Model tests", () => {
    let user;

    beforeEach(async() => {
      //flush categories
      await Category.deleteMany({});

      user = await User.findOne({name: "Jill"});
    });

    it("should save a valid category", async() => {
      await Category.create({
        name: "Food",
        userId: user._id
      })
        .catch((error) => {
          should.not.exist(error, "The category should have been valid");
        })
        .then((category) => {
          should.exist(category);
        });
    });

    it("should require a name", async() => {
      await Category.create({
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((category) => {
          should.not.exist(category, "The category should have been invalid");
        });      
    });

    it("should require a name of at least 3 characters", async() => {
      await Category.create({
        name: "Fo",
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((category) => {
          should.not.exist(category, "The category should have been invalid");
        });      
    });

    it("should require a name less than 61 characters", async() => {
      await Category.create({
        name: "A".repeat(61),
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((category) => {
          should.not.exist(category, "The category should have been invalid");
        });      
    });

    it("should require a user", async() => {
      await Category.create({
        name: "Food"
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((category) => {
          should.not.exist(category, "The category should have been invalid");
        }); 
    });
  });

  // TEST ROUTING & CONTROLLERS

  describe("API tests", () => {
    let user;
    let category;
    let authToken;
    
    let otherUser;
    let otherCategory;

    const genCategory = async() => {
      user = await User.findOne({name: "Jill"});
      return {
        name: "Food",
        userId: user._id
      };
    };

    before(async() => {
      // set up other user and category 
      const USER = {
        name: "John",
        email: "John@example.com",
        password: "123"
      };

      await User.create({...USER});
    });

    beforeEach(async() => {
      //flush categories
      await Category.deleteMany({});

      //get users 
      user = await User.findOne({name: "Jill"});
      otherUser = await User.findOne({name: "John"});
      authToken = generateToken(user);

      // category belonging to the other user
      const OTHER_CATEGORY = {
        name: "Bills"
      };
      otherCategory = await Category.create({...OTHER_CATEGORY, userId: otherUser._id});

      // add a category to the user
      const CATEGORY = {
        name: "Electricity"
      };
      category = await Category.create({...CATEGORY, userId: user._id});
    });

    it("should require a logged in user", async() => {
      const res = await chai.request(app)
        .get("/api/category/");
      assertError(res, 401);
    });

    it("should get categories belonging to the user", async() => {
      const res = await chai.request(app)
        .get("/api/category/")
        .set("Authorization", ("Bearer " + authToken));
        
      res.should.have.status(200);
      res.should.have.property("body");
      should.exist(res.body, "Should have gotten an array of categories");
      res.body.length.should.equal(1, "Should have only received one category");
      res.body[0].should.have.property("name", category.name);
    });

    it("should get categories along with spending limits belonging to the user", async() => {

      await SpendingLimit.create({
        name: "Spending Limit", 
        userId: user._id,
        amount: 100,
        duration: {
          type: "WEEK"
        },
        category: category._id
      });

      const res = await chai.request(app)
        .get("/api/category/withSpendingLimit")
        .set("Authorization", ("Bearer " + authToken));
        
      res.should.have.status(200);
      res.should.have.property("body");
      should.exist(res.body, "Should have gotten an array of categories");
      res.body.length.should.equal(1, "Should have only received one category");
      res.body[0].should.have.property("name", category.name);
      res.body[0].should.have.property("spendingLimit");
      res.body[0].spendingLimit.name.should.equal("Spending Limit");
    });

    it("should post a valid category", async() => {
      const res = await chai.request(app)
        .post("/api/category/")
        .send(await genCategory())
        .set("Authorization", ("Bearer " + authToken));

      res.should.have.status(201);
      res.should.have.property("body");
      res.body.should.have.property("name", "Food");
    });

    it("should get a specific category", async() => {
      const res = await chai.request(app)
        .get("/api/category/" + category._id)
        .set("Authorization", ("Bearer " + authToken));

      res.should.have.status(200);
      res.should.have.property("body");
      should.exist(res.body, "Should have gotten a category");
      res.body.should.have.property("name", category.name);
    });

    it("should not get a category that does not exist", async() => {
      const res = await chai.request(app)
        .get("/api/category/" + "111111111111111111111111") // test with invalid id
        .set("Authorization", ("Bearer " + authToken));

      assertError(res, 404);
    });

    it("should prevent the user from getting a category of a different user", async() => {
      const res = await chai.request(app)
        .get("/api/category/" + otherCategory._id)
        .set("Authorization", ("Bearer " + authToken));
      
      assertError(res, 403);
    });

    it("should delete a specified category", async() => {
      const res = await chai.request(app)
        .delete("/api/category/" + category._id)
        .set("Authorization", ("Bearer " + authToken));
      res.should.have.status(200);

      const resPost = await chai.request(app)
        .get("/api/category/" + category._id)
        .set("Authorization", ("Bearer " + authToken));
      assertError(resPost, 404);
    });

    it("should not delete a category that does not exist", async() => {
      const initCategories = await Category.countDocuments();
      const res = await chai.request(app)
        .get("/api/category/" + "111111111111111111111111") // test with invalid id
        .set("Authorization", ("Bearer " + authToken));

      const categories = await Category.countDocuments();
      categories.should.be.equal(initCategories); 
      assertError(res, 404);
    });

    it("should prevent the user from deleting another user's category", async() => {
      const res = await chai.request(app)
        .delete("/api/category/" + otherCategory._id)
        .set("Authorization", ("Bearer " + authToken));
      assertError(res, 403);

      // other category should still exist
      const resPost = await chai.request(app)
        .get("/api/category/" + otherCategory._id)
        .set("Authorization", ("Bearer " + generateToken(otherUser)));

      resPost.should.have.status(200);
      resPost.should.have.property("body");
      should.exist(resPost.body, "Should have gotten a payment");
      resPost.body.should.have.property("name", otherCategory.name);
    });

    it("should update a specified category", async() => {
      const res = await chai.request(app)
        .patch("/api/category/" + category._id)
        .send(await genCategory())
        .set("Authorization", ("Bearer " + authToken));

      // should return category before updating
      res.should.have.status(200);
      res.should.have.property("body");
      res.body.should.have.property("name", category.name);

      // should return newly updated category
      const resPost = await chai.request(app)
        .get("/api/category/" + category._id)
        .set("Authorization", ("Bearer " + authToken));

      resPost.should.have.status(200);
      resPost.should.have.property("body");
      resPost.body.should.have.property("name", "Food");
    });

    it("should not update a category that does not exist", async() => {
      const res = await chai.request(app)
        .get("/api/category/" + "111111111111111111111111") // test with invalid id
        .set("Authorization", ("Bearer " + authToken));

      assertError(res, 404);
    });

    it("should prevent the user from modifying another user's category", async() => {
      const res = await chai.request(app)
        .patch("/api/category/" + otherCategory._id)
        .send(await genCategory())
        .set("Authorization", ("Bearer " + authToken));
      assertError(res, 403);

      // should not have modified the other user's category
      const resPost = await chai.request(app)
        .get("/api/category/" + otherCategory._id)
        .set("Authorization", ("Bearer " + generateToken(otherUser)));

      resPost.should.have.status(200);
      resPost.should.have.property("body");
      should.exist(resPost.body, "Should have gotten a category");
      resPost.body.should.have.property("name", otherCategory.name);
    });

    it("should return categories without a spending limit associated with them", async() => {
      otherCategory.userId = user._id;
      await otherCategory.save();

      await SpendingLimit.create({
        name: "Spending Limit", 
        userId: user._id,
        amount: 100,
        duration: {
          type: "WEEK"
        },
        category: category._id
      });

      const res = await chai.request(app)
        .get("/api/category/noSpendingLimit")
        .set("Authorization", ("Bearer " + authToken));
      
      res.should.have.status(200);
      res.should.have.property("body");
      should.exist(res.body, "Should have gotten an array of categories");
      res.body.length.should.equal(1, "Should have only received one category");
      res.body[0].should.have.property("name", otherCategory.name);
    });
  });
});
