const mongoose = require("mongoose");
const Achievement = require("../models/achievementModel");
const AchievementSpec = require("../models/achievementSpecModel");
const User = require("../models/userModel");

const {flushDB, assertError, generateToken} = require("./utils");

const chai = require("chai");
const should = chai.should();

const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);

describe("Achievement tests", () => {

  beforeEach(async() => {
    await flushDB();

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

    await AchievementSpec.create(ACHIEVEMENT_SPEC);
  });

  describe("AchievementSpec model tests", () => {
    it("should create a valid category achievement", async() => {
      // category achievement created in beforeEach
      const achievement = await AchievementSpec.findOne({title: "categoryAchievement"});
      should.exist(achievement);
      achievement.should.have.property("title").eql("categoryAchievement");
      achievement.should.have.property("description").eql("An achievement");
      achievement.should.have.property("exp");
      achievement.should.have.property("type").eql("category");
    });

    it("should create a valid payment achievement", async() => {
      const PAYMENT_ACHIEVEMENT = {
        title: "paymentAchievement",
        description: "An achievement",
        exp: 10,
        requirements: {
          noPayments: {
            target: 1
          }
        }
      };
      const achievement = await AchievementSpec.create(PAYMENT_ACHIEVEMENT);
      should.exist(achievement);
      achievement.should.have.property("title").eql("paymentAchievement");
      achievement.should.have.property("description").eql("An achievement");
      achievement.should.have.property("exp");
      achievement.should.have.property("type").eql("payment");
    });

    it("should create a valid limit achievement", async() => {
      const LIMIT_ACHIEVEMENT = {
        title: "limitAchievement",
        description: "An achievement",
        exp: 10,
        requirements: {
          limitsSet: {
            target: 1
          }
        }
      };
      const achievement = await AchievementSpec.create(LIMIT_ACHIEVEMENT);
      should.exist(achievement);
      achievement.should.have.property("title").eql("limitAchievement");
      achievement.should.have.property("description").eql("An achievement");
      achievement.should.have.property("exp");
      achievement.should.have.property("type").eql("limit");
    });
    
    it("should not create an ahcievement of an invalid type", async() => {
      const INVALID_ACHIEVEMENT = {
        title: "invalidAchievement",
        description: "An invalid achievement",
        exp: 10,
        requirements: {
          invalidField: {
            target: 1
          }
        }
      };
      await AchievementSpec.create(INVALID_ACHIEVEMENT)
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError")
        })
        .then((achievement) => {
          should.not.exist(achievement, "The achievement should have been invalid")
        });
    });

    it("should not allow fields to be changed", async() => {
      // category achievement created in beforeEach
      const achievement = await AchievementSpec.findOne({title: "categoryAchievement"});
      achievement.title = "Should not be changed";

      achievement.save()
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError")
        })
        .then((achievement) => {
          should.exist(achievement);
          achievement.should.have.property("title").eql("limitAchievement");
          achievement.should.have.property("description").eql("An achievement");
          achievement.should.have.property("exp");
          achievement.should.have.property("type").eql("limit");
        });
    });

    it("should have unique titles", async() => {
      const REPEAT_ACHIEVEMENT = {
        title: "categoryAchievement",
        description: "An achievement",
        exp: 10,
        requirements: {
          noCategories: {
            target: 1
          }
        }
      };

      await AchievementSpec.create(REPEAT_ACHIEVEMENT)
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("MongoServerError")
        })
        .then((achievement) => {
          should.not.exist(achievement, "The achievement should have been invalid")
        });
    });

    it("should require a title", async() => {
      const NO_TITLE_ACHIEVEMENT = {
        description: "An achievement",
        exp: 10,
        requirements: {
          noCategories: {
            target: 1
          }
        }
      }

      await AchievementSpec.create(NO_TITLE_ACHIEVEMENT)
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError")
        })
        .then((achievement) => {
          should.not.exist(achievement, "The achievement should have been invalid")
        });
    });

    it("should require a description", async() => {
      const NO_DESCRIPTION_ACHIEVEMENT = {
        title: "noDescription",
        exp: 10,
        requirements: {
          noCategories: {
            target: 1
          }
        }
      }

      await AchievementSpec.create(NO_DESCRIPTION_ACHIEVEMENT)
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError")
        })
        .then((achievement) => {
          should.not.exist(achievement, "The achievement should have been invalid")
        });
    });

    it("should require an exp amount", async() => {
      const NO_EXP_ACHIEVEMENT = { 
        title: "noExp",
        description: "An achievement",
        requirements: {
          noCategories: {
            target: 1
          }
        }
      }

      await AchievementSpec.create(NO_EXP_ACHIEVEMENT)
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError")
        })
        .then((achievement) => {
          should.not.exist(achievement, "The achievement should have been invalid")
        });
    });

    it("should require a set of requirements", async() => {
      const NO_REQUIREMENTS_ACHIEVEMENT = {
        title: "categoryAchievement",
        description: "An achievement",
        exp: 10,
      }

      await AchievementSpec.create(NO_REQUIREMENTS_ACHIEVEMENT)
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError")
        })
        .then((achievement) => {
          should.not.exist(achievement, "The achievement should have been invalid")
        });
    });

  });
});