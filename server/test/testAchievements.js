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
      title: "Achievement",
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
    it("should create a valid category achievement");
    it("should create a valid payment achievement");
    it("should create a valid limit achievement");
    it("should not create an ahcievement of an invalid type");
    it("should not allow fields to be changed");
    it("should have unique titles");
    it("should require a title");
    it("should require a description");
    it("should require an exp amount");
    it("should require a set of requirements");
  });
});