const Category = require("./models/categoryModel");
const User = require("./models/userModel");
const Payment = require("./models/paymentModel");
const SpendingLimit = require("./models/spendingLimitModel");
const utils = require("./test/utils");
const axios = require("axios");

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

// eslint-disable-next-line no-unused-vars
const app = require("./app");

const NUMBER_OF_USERS = 5;
const DEFAULT_PASSWORD = "123";

function rand(max) {
  return Math.floor(Math.random() * max);
} 
 
async function imageUrlToB64(imgURL) {
  let image = await axios.get(imgURL, {responseType: "arraybuffer"});
  return Buffer.from(image.data).toString("base64");
}

async function createUser(user, pass) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);

  return await User.create({
    ...user,
    password: hashedPassword
  });
}

async function getRandomCategoryFromUser(user) {
  const userCategories = await Category.find({userId: user._id}).lean();
  return faker.helpers.arrayElement(userCategories);
}

async function getRandomCategorySetFromUser(user) {
  const userCategories = await Category.find({userId: user._id}).lean();
  return faker.helpers.arrayElements(userCategories);
}

async function createDefaultModels() {
  const DEFAULT_USER = {
    name: "John Doe",
    email: "johndoe@example.com"
  };

  const user = await createUser(DEFAULT_USER, DEFAULT_PASSWORD);
  
  for(let i = 0; i < 4; ++i) await createRandomCategory(user);
  for(let i = 0; i < 7; ++i) await createRandomPayment(user);
  await createRandomSpendingLimits(user);
  await createRandomOverallSpendingLinit(user);
}

async function createRandomUser() {
  const user = {
    name: faker.name.firstName(),
    email: faker.internet.email()
  };

  return await createUser(user, DEFAULT_PASSWORD);
}

async function createRandomCategory(user) {
  const category = {
    name: faker.word.noun(),
    userId: user._id
  };
  
  return await Category.create(category);
}

async function createRandomPayment(user) {
  const category = await getRandomCategoryFromUser(user);
  const image = await imageUrlToB64(faker.image.image());

  const payment = {
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    amount: rand(100) / 10,
    categoryId: category._id,
    userId: user._id,
    image: {
      data: image,
      contentType: "image/jpeg"
    },
    date: faker.date.recent(7)
  };

  return await Payment.create(payment);
}

async function createRandomSpendingLimits(user) {
  const categories = await getRandomCategorySetFromUser(user);
  let spendingLimits = [];

  categories.forEach(async (category) => {
    const duration = {
      type: faker.helpers.arrayElement(["YEAR", "MONTH", "DAY", "WEEK"])
    };
  
    const spendingLimit = {
      name: faker.word.noun(),
      userId: user._id,
      amount: rand(100),
      duration: duration,
      category: category._id
    };
    
    spendingLimits.push(await SpendingLimit.create(spendingLimit));
  });
  
  return spendingLimits;
}

async function createRandomOverallSpendingLinit(user) {
  const duration = {
    type: faker.helpers.arrayElement(["YEAR", "MONTH", "DAY", "WEEK"])
  };

  const spendingLimit = {
    name: faker.word.noun(),
    userId: user._id,
    amount: rand(100),
    duration: duration,
  };

  return await  SpendingLimit.create(spendingLimit);
}

async function createRandomUserAndRecords() {
  const user = await createRandomUser();

  for (let i = 0; i < rand(10) + 1; ++i) await createRandomCategory(user); //Must be at least 1 category for payments to be associated with
  for (let i = 0; i < rand(25); ++i) await createRandomPayment(user);
  await createRandomSpendingLimits(user);
  await createRandomOverallSpendingLinit(user);
}

async function seed() {
  await utils.flushDB();
  await createDefaultModels();
  for (let i = 0; i < NUMBER_OF_USERS; ++i) await createRandomUserAndRecords();
  process.exit();
}

seed();