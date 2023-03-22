const mongoose = require("mongoose");
const Achievement = require("../models/achievementModel");
const AchievementSpec = require("../models/achievementSpecModel");
const User = require("../models/userModel");

const {flushDB, assertError, generateToken} = require("./utils");

const chai = require("chai");
const should = chai.should();

const chaiHttp = require("chai-http");
const app = require("../app");
const { before } = require("mocha");

chai.use(chaiHttp);

describe("Achievement tests", () => {

  let achievementSpec;
  let user;
  let authToken;

  before(async() => {
    await flushDB();
    
    const USER = {
      name: "Jill",
      email: "jill@example.com",
      password: "123"
    };

    const ACHIEVEMENT_SPEC = {
      title: "First achievement",
      description: "Create your first category",
      exp: 10,
      requirements: {
        noCategories: {
          target: 1
        }
      }
    };
    
    achievementSpec = await AchievementSpec.create(ACHIEVEMENT_SPEC);
    user = await User.create(USER);
    authToken = generateToken(user);
  });

  

  after(async() => {
    await flushDB();
  });

  describe("Achievement model tests", () => {
    let achievement;

    beforeEach(async() => {
      achievement = await Achievement.create({userId: user._id, achievementSpecId: achievementSpec._id});
    });

    afterEach(async() => {
      await Achievement.deleteMany({});
    });

    it("should create a valid achievement", async() => {
      //beforeEach should have succeded
      achievement.should.exist;
      achievement.should.have.property("userId");
      achievement.should.have.property("achievementSpecId");
    });

    it("should require a user", async() => {
      await Achievement.create({achievementSpecId: achievementSpec._id})
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((achievement) => {
          should.not.exist(achievement, "Achivement should have been invalid");
        });
    });

    it("should require an achievementSpec", async() => {
      await Achievement.create({userId: user._id})
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((achievement) => {
          should.not.exist(achievement, "Achivement should have been invalid");
        });
    });
  });

  describe("Achievement api tests", () => {
    let unowned;
    let achievement;

    before(async() => {
      const ACHIEVEMENT_SPEC = {
        title: "Second Achivement",
        description: "Create two categories",
        exp: 10,
        requirements: {
          noCategories: {
            target: 2
          }
        }
      };
      
      unowned = await AchievementSpec.create(ACHIEVEMENT_SPEC);
    });

    beforeEach(async() => {
      achievement = await Achievement.create({userId: user._id, achievementSpecId: achievementSpec._id});
    });

    afterEach(async() => {
      await Achievement.deleteMany({});
    });

    it("should get achievements", async() => {
      const res = await chai.request(app)
        .get("/api/achievement/")
        .set("Authorization", ("Bearer " + authToken));
      res.should.have.status(200);
      res.body.length.should.equal(2);

      should.exist(res.body[0], "Should have gotten an achievement");
      const obj1 = res.body[0];
      obj1.should.have.property("title").eql(achievementSpec.title);
      obj1.should.have.property("description").eql(achievementSpec.description);
      obj1.should.have.property("owned").eql(true);
      obj1.should.have.property("type").eql(achievementSpec.type);
      obj1.should.have.property("exp");
      obj1.exp.should.be.equal(achievementSpec.exp);

      should.exist(res.body[1], "Should have gotten achievements not achieved by the user");
      const obj2 = res.body[1];
      obj2.should.have.property("title").eql(unowned.title);
      obj2.should.have.property("description").eql(unowned.description);
      obj2.should.have.property("owned").eql(false);
      obj2.should.have.property("type").eql(unowned.type);
      obj2.should.have.property("exp");
      obj2.exp.should.be.equal(unowned.exp);
    });

    it("should only get owned achievements", async() => {
      const res = await chai.request(app)
        .get("/api/achievement/?selection=owned")
        .set("Authorization", ("Bearer " + authToken));
      res.should.have.status(200);
      res.body.length.should.equal(1);
    });

    it("should only get unowned achievements", async() => {
      const res = await chai.request(app)
        .get("/api/achievement/?selection=unowned")
        .set("Authorization", ("Bearer " + authToken));

      res.should.have.status(200);
      res.body.length.should.equal(1);
    });

    it("should get a specific achievement", async() => {
      const res = await chai.request(app)
        .get("/api/achievement/" + achievement._id)
        .set("Authorization", ("Bearer " + authToken));

      const obj = res.body;

      res.should.have.status(200);
      obj.should.have.property("title").eql(achievementSpec.title);
      obj.should.have.property("description").eql(achievementSpec.description);
      obj.should.have.property("type").eql(achievementSpec.type);
      obj.should.have.property("exp");
      obj.exp.should.be.equal(achievementSpec.exp);
    });
  });

  describe("Category achievement tests", () => {

    beforeEach(async() => {
      
    });

    afterEach(async() => {
      await Achievement.deleteMany({});
    });

    it("should detect an achievement", async() => {
      // achieve an achievement
      const res = await chai.request(app)
        .post("/api/category/")
        .send({
          name: "Food",
          userId: user._id
        })
        .set("Authorization", ("Bearer " + authToken));

      res.should.have.status(201);
      res.body.should.have.property("achievements");

      const achievement = res.body.achievements[0];
      should.equal(achievement.title, "First achievement");
      should.equal(achievement.description, "Create your first category");
      should.equal(achievement.owned, true);
      should.equal(achievement.exp, 10);
    });

    it("should detect multiple achievements simultaneously", async() => {
      const Category = require("../models/categoryModel");
      await Category.create({name: "Entertainment", userId: user._id});
      const res = await chai.request(app)
        .post("/api/category/")
        .send({
          name: "Food",
          userId: user._id
        })
        .set("Authorization", ("Bearer " + authToken));

      res.should.have.status(201);
      res.body.should.have.property("achievements");
      should.equal(res.body.achievements.length, 2);
    });

    it("should not detect an achievement whenever requirements are not met");

    it("should not create an achievement that has already been created", async() => {
      const Category = require("../models/categoryModel");
      await Category.create({name: "Entertainment", userId: user._id});
      await chai.request(app)
        .post("/api/category/")
        .send({
          name: "Food",
          userId: user._id
        })
        .set("Authorization", ("Bearer " + authToken));

      const res = await chai.request(app)
        .post("/api/category/")
        .send({
          name: "Food",
          userId: user._id
        })
        .set("Authorization", ("Bearer " + authToken));

      res.should.have.status(201);
      res.body.should.have.property("achievements");
      should.equal(res.body.achievements.length, 0);

      const postRes = await chai.request(app)
        .get("/api/achievement/?selection=owned")
        .set("Authorization", ("Bearer " + authToken));
      postRes.should.have.status(200);
      postRes.body.length.should.equal(2);
    });
  });
});