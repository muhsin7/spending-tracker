const mongoose = require("mongoose");
const Achievement = require("../models/achievementModel");
const AchievementSpec = require("../models/achievementSpecModel");
const User = require("../models/userModel");

const { flushDB, assertError, generateToken } = require("./utils");

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

  before(async () => {
    await flushDB();

    const USER = {
      name: "Jill",
      email: "jill@example.com",
      password: "123",
    };

    const ACHIEVEMENT_SPEC = {
      title: "First achievement",
      description: "Create your first category",
      exp: 10,
      requirements: {
        noCategories: {
          target: 1,
        },
      },
    };

    achievementSpec = await AchievementSpec.create(ACHIEVEMENT_SPEC);
    user = await User.create(USER);
    authToken = generateToken(user);
  });

  after(async () => {
    await flushDB();
  });

  describe("Achievement model tests", () => {
    let achievement;

    beforeEach(async () => {
      achievement = await Achievement.create({
        userId: user._id,
        achievementSpecId: achievementSpec._id,
      });
    });

    afterEach(async () => {
      await Achievement.deleteMany({});
    });

    it("should create a valid achievement", async () => {
      //beforeEach should have succeded
      achievement.should.exist;
      achievement.should.have.property("userId");
      achievement.should.have.property("achievementSpecId");
    });

    it("should require a user", async () => {
      await Achievement.create({ achievementSpecId: achievementSpec._id })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((achievement) => {
          should.not.exist(achievement, "Achivement should have been invalid");
        });
    });

    it("should require an achievementSpec", async () => {
      await Achievement.create({ userId: user._id })
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

    before(async () => {
      const ACHIEVEMENT_SPEC = {
        title: "Second Achivement",
        description: "Create two categories",
        exp: 10,
        requirements: {
          noCategories: {
            target: 2,
          },
        },
      };

      unowned = await AchievementSpec.create(ACHIEVEMENT_SPEC);
    });

    beforeEach(async () => {
      achievement = await Achievement.create({
        userId: user._id,
        achievementSpecId: achievementSpec._id,
      });
    });

    afterEach(async () => {
      await Achievement.deleteMany({});
    });

    it("should get achievements", async () => {
      const res = await chai
        .request(app)
        .get("/api/achievement/")
        .set("Authorization", "Bearer " + authToken);
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

      should.exist(
        res.body[1],
        "Should have gotten achievements not achieved by the user"
      );
      const obj2 = res.body[1];
      obj2.should.have.property("title").eql(unowned.title);
      obj2.should.have.property("description").eql(unowned.description);
      obj2.should.have.property("owned").eql(false);
      obj2.should.have.property("type").eql(unowned.type);
      obj2.should.have.property("exp");
      obj2.exp.should.be.equal(unowned.exp);
    });

    it("should only get owned achievements", async () => {
      const res = await chai
        .request(app)
        .get("/api/achievement/?selection=owned")
        .set("Authorization", "Bearer " + authToken);
      res.should.have.status(200);
      res.body.length.should.equal(1);
    });

    it("should only get unowned achievements", async () => {
      const res = await chai
        .request(app)
        .get("/api/achievement/?selection=unowned")
        .set("Authorization", "Bearer " + authToken);

      res.should.have.status(200);
      res.body.length.should.equal(1);
    });

    it("should get a specific achievement", async () => {
      const res = await chai
        .request(app)
        .get("/api/achievement/" + achievement._id)
        .set("Authorization", "Bearer " + authToken);

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
    let Category;

    before(async () => {
      Category = require("../models/categoryModel");
    });

    afterEach(async () => {
      await Achievement.deleteMany({});
      await Category.deleteMany({});
    });

    it("should detect an achievement", async () => {
      // achieve an achievement
      const res = await chai
        .request(app)
        .post("/api/category/")
        .send({
          name: "Food",
          userId: user._id,
        })
        .set("Authorization", "Bearer " + authToken);

      res.should.have.status(201);
      res.body.should.have.property("achievements");

      const achievement = res.body.achievements[0];
      should.equal(achievement.title, "First achievement");
      should.equal(achievement.description, "Create your first category");
      should.equal(achievement.owned, true);
      should.equal(achievement.exp, 10);
    });

    it("should detect multiple achievements simultaneously", async () => {
      await Category.create({ name: "Entertainment", userId: user._id });
      const res = await chai
        .request(app)
        .post("/api/category/")
        .send({
          name: "Food",
          userId: user._id,
        })
        .set("Authorization", "Bearer " + authToken);

      res.should.have.status(201);
      res.body.should.have.property("achievements");
      should.equal(res.body.achievements.length, 2);
    });

    it("should not detect an achievement whenever requirements are not met", async () => {
      const res = await chai
        .request(app)
        .post("/api/category/")
        .send({
          name: "Food",
          userId: user._id,
        })
        .set("Authorization", "Bearer " + authToken);

      res.should.have.status(201);
      res.body.should.have.property("achievements");
      should.equal(res.body.achievements.length, 1);
    });

    it("should not create an achievement that has already been created", async () => {
      await Category.create({ name: "Entertainment", userId: user._id });
      await chai
        .request(app)
        .post("/api/category/")
        .send({
          name: "Food",
          userId: user._id,
        })
        .set("Authorization", "Bearer " + authToken);

      const res = await chai
        .request(app)
        .post("/api/category/")
        .send({
          name: "Food",
          userId: user._id,
        })
        .set("Authorization", "Bearer " + authToken);

      res.should.have.status(201);
      res.body.should.have.property("achievements");
      should.equal(res.body.achievements.length, 0);

      const postRes = await chai
        .request(app)
        .get("/api/achievement/?selection=owned")
        .set("Authorization", "Bearer " + authToken);
      postRes.should.have.status(200);
      postRes.body.length.should.equal(2);
    });
  });

  describe("Payment achievement tests", () => {
    let Payment;
    let Category;

    before(async () => {
      Payment = require("../models/paymentModel");
      Category = require("../models/categoryModel");

      await Category.create({ name: "Entertainment", userId: user._id });

      await AchievementSpec.create({
        title: "First payment",
        description: "Create your first payment",
        exp: 10,
        requirements: {
          noPayments: {
            target: 1,
          },
        },
      });

      await AchievementSpec.create({
        title: "Big payment",
        description: "Pay a lot of money",
        exp: 10,
        requirements: {
          noPayments: {
            target: 1,
          },
          largestPayment: {
            target: 500,
          },
          boolOp: "AND",
        },
      });

      await AchievementSpec.create({
        title: "Another Big payment",
        description: "Pay a lot of money",
        exp: 10,
        requirements: {
          noPayments: {
            target: 98,
          },
          largestPayment: {
            target: 600,
          },
          boolOp: "OR",
        },
      });
    });

    afterEach(async () => {
      await Achievement.deleteMany({});
      await Payment.deleteMany({});
    });

    const genPayment = async (amount) => {
      const category = await Category.findOne({ name: "Entertainment" });
      return {
        title: "Console",
        description: "A games console",
        amount: amount,
        categoryId: category._id,
        userId: user._id,
      };
    };

    it("should detect an achievement", async () => {
      const res = await chai
        .request(app)
        .post("/api/payment/")
        .send(await genPayment(300))
        .set("Authorization", "Bearer " + authToken);

      res.body.should.have.property("achievements");
      const achievement = res.body.achievements[0];
      should.equal(achievement.title, "First payment");
      should.equal(achievement.description, "Create your first payment");
      should.equal(achievement.owned, true);
      should.equal(achievement.exp, 10);
      should.equal(res.body.achievements.length, 1);
    });

    it("should not get an achievement when ther requirements are not met", async () => {
      const res = await chai
        .request(app)
        .post("/api/payment/")
        .send(await genPayment(200))
        .set("Authorization", "Bearer " + authToken);

      res.should.have.status(201);
      res.body.should.have.property("achievements");
      should.equal(res.body.achievements.length, 1); // should not get achievement 2 and 3
    });

    it("should detect an achievement that requires both conditions && detect simultaneosly", async () => {
      const res = await chai
        .request(app)
        .post("/api/payment/")
        .send(await genPayment(500))
        .set("Authorization", "Bearer " + authToken);

      res.should.have.status(201);
      res.body.should.have.property("achievements");
      should.equal(res.body.achievements.length, 2);
    });

    it("should detect an achievement that requires one of two conditions", async () => {
      const res = await chai
        .request(app)
        .post("/api/payment/")
        .send(await genPayment(800))
        .set("Authorization", "Bearer " + authToken);

      res.should.have.status(201);
      res.body.should.have.property("achievements");
      should.equal(res.body.achievements.length, 3);
    });

    it("should not create an achievement that has already been created", async () => {
      await chai
        .request(app)
        .post("/api/payment/")
        .send(await genPayment(300))
        .set("Authorization", "Bearer " + authToken);

      const res = await chai
        .request(app)
        .post("/api/payment/")
        .send(await genPayment(300))
        .set("Authorization", "Bearer " + authToken);

      res.body.should.have.property("achievements");
      should.equal(res.body.achievements.length, 0);
    });
  });

  describe("Streak achievement tests", () => {
    before(async () => {
      await AchievementSpec.create({
        title: "10 days",
        description: "Stay under all payment limits for 10 days in a row",
        exp: 10,
        requirements: {
          underLimitStreak: {
            target: 10,
          },
        },
      });

      await AchievementSpec.create({
        title: "20 days",
        description: "Stay under all payment limits for 20 days in a row",
        exp: 20,
        requirements: {
          underLimitStreak: {
            target: 20,
          },
        },
      });
    });

    afterEach(async () => {
      await Achievement.deleteMany({});
      user.streakSince = new Date();
      await user.save();
    });

    

    const setDaysBack = async (days) => {
      const date = new Date(user.streakSince - (days * (24*60*60*1000)));
      user.streakSince = date;
      await user.save();
    };

    it("should detect an achievement", async () => {
      setDaysBack(10);
      const res = await chai
        .request(app)
        .patch("/api/user/")
        .send({})
        .set("Authorization", "Bearer " + authToken);

      should.equal(res.body.achievements.length, 1);
      res.body.achievements[0].should.have.property("title", "10 days");
    });

    it("should detect multiple achievements simultaneously", async () => {
      setDaysBack(20);
      const res = await chai
        .request(app)
        .patch("/api/user/")
        .send({})
        .set("Authorization", "Bearer " + authToken);

      should.equal(res.body.achievements.length, 2);
      res.body.achievements[0].should.have.property("title", "10 days");
      res.body.achievements[1].should.have.property("title", "20 days");
    });

    it("should not detect an achievement whenever requirements are not met", async () => {
      setDaysBack(5);
      const res = await chai
        .request(app)
        .patch("/api/user/")
        .send({})
        .set("Authorization", "Bearer " + authToken);

      should.equal(res.body.achievements.length, 0);
    });

    it("should not create an achievement that has already been created", async () => {
      setDaysBack(20);
      await chai
        .request(app)
        .patch("/api/user/")
        .send({})
        .set("Authorization", "Bearer " + authToken);

      const res = await chai
        .request(app)
        .patch("/api/user/")
        .send({})
        .set("Authorization", "Bearer " + authToken);

      should.equal(res.body.achievements.length, 0);
    });
  });
});