const Category = require("./models/categoryModel");
const User = require("./models/userModel");
const Payment = require("./models/paymentModel");
const SpendingLimit = require("./models/spendingLimitModel");
const utils = require("./test/utils");

const { faker } = require('@faker-js/faker');
const bcrypt = require("bcrypt");

const app = require("./app");

const NUMBER_OF_USERS = 100;
const DEFAULT_PASSWORD = "123";

function rand(max) {
  return Math.floor(Math.random() * max);
} 

async function createUser(user, pass) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);

  return await User.create({
    ...user,
    password: hashedPassword
  });
}

async function createDefaultModels() {
  const DEFAULT_USER = {
    name: "John Doe",
    email: "johndoe@example.com"
  };

  const user = await createUser(DEFAULT_USER, DEFAULT_PASSWORD);

}

async function createRandomUser() {
  const user = {
    name: faker.name.firstName(),
    email: faker.internet.email()
  };

  await createUser(user, DEFAULT_PASSWORD);
}

async function createRandomCategory(user) {
  //TODO
}

async function createRandomPayment(user) {
  //TODO
}

async function createRandomSpendingLimit(user, category) {
  //TODO
}

async function createRandomOverallSpendingLinit(user) {
  //TODO
}

async function seed() {
  await utils.flushDB();
  await createDefaultModels();
  await createRandomUser();
  process.exit();
}

seed();