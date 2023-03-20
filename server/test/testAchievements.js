const mongoose = require("mongoose");
const Achievement = require("../models/achievementModel");
const AchievementSpec = require("../models/achievementSpecModel");
const User = require("../models/userModel");

const {flushDB, assertError} = require("./utils");

const chai = require("chai");
const should = chai.should();

const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);

describe("Achievement tests", () => {
  describe("Achievement model tests", () => {
    let achievementSpec;
    let user;
    let achievement;

    beforeEach(async() => {
      await flushDB();
    
      const USER = {
        name: "Jill",
        email: "jill@example.com",
        password: "123"
      };

      const ACHIEVEMENT_SPEC = {
        title: "categoryAchievement",
        description: "An achievement",
        exp: 10,
        requirements: {
          noCategories: {
            target: 1
          }
        }
      };
    
      achievementSpec = await AchievementSpec.create(ACHIEVEMENT_SPEC);
      user = await User.create(USER);
      achievement = await Achievement.create({userId: user._id, achievementSpecId: achievementSpec._id});
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

    it("should include extra fields", async() => {
      const obj = await Achievement.findById(achievement._id);

      console.log(obj);

      obj.should.have.property("title").eql(achievementSpec.title);
      obj.should.have.property("description").eql(achievementSpec.description);
      obj.should.have.property("type").eql(achievementSpec.type);
      obj.should.have.property("exp");
      obj.exp.should.be.equal(achievementSpec.exp);
    });
  });
});