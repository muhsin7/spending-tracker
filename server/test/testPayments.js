const Category = require("../models/categoryModel");
const Payment = require("../models/paymentModel");
const User = require("../models/userModel");

const {flushDB, assertError, generateToken} = require("./utils");

const chai = require("chai");
const should = chai.should();

const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);

describe("Payment tests", () => {
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

  describe("Model tests", () => {
    let user;
    let category;

    beforeEach(async() => {
      //flush payments
      await Payment.deleteMany({});

      // load required object from database
      user = await User.findOne({name: "Jill"});
      category = await Category.findOne({name: "Groceries"});
    });

    it("should save a valid payment", async() => {
      await Payment.create({
        title: "Carrots",
        description: "A 1kg bag of carrots",
        amount: 2,
        categoryId: category._id,
        userId: user._id
      })
        .catch((error) => {
          should.not.exist(error, "The payment should have been valid");
        })
        .then((payment) => {
          should.exist(payment);
        });
    });

    it("should require a title", async() => {
      await Payment.create({
        description: "A 1kg bag of carrots",
        amount: 2,
        categoryId: category._id,
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((payment) => {
          should.not.exist(payment, "The payment should have been invalid");
        });
    });

    it("should require a title of at least 3 characters", async() => {
      await Payment.create({
        title: "aa",
        description: "A 1kg bag of carrots",
        amount: 2,
        categoryId: category._id,
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((payment) => {
          should.not.exist(payment, "The payment should have been invalid");
        });
    });

    it("should require a title less than 61 characters", async() => {
      await Payment.create({
        title: "a".repeat(61),
        description: "A 1kg bag of carrots",
        amount: 2,
        categoryId: category._id,
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((payment) => {
          should.not.exist(payment, "The payment should have been invalid");
        });
    });

    it("should require a description", async() => {
      await Payment.create({
        title: "Carrots",
        amount: 2,
        categoryId: category._id,
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((payment) => {
          should.not.exist(payment, "The payment should have been invalid");
        }); 
    });

    it("should require a description of at least 3 characters", async() => {
      await Payment.create({
        title: "Carrots",
        description: "AA",
        amount: 2.6,
        categoryId: category._id,
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((payment) => {
          should.not.exist(payment, "The payment should have been invalid");
        }); 
    });

    it("should require a description less than 301 characters", async() => {
      await Payment.create({
        title: "Carrots",
        description: "A".repeat(301),
        amount: 2,
        categoryId: category._id,
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((payment) => {
          should.not.exist(payment, "The payment should have been invalid");
        }); 
    });

    it("should require an amount", async() => {
      await Payment.create({
        title: "Carrots",
        description: "A 1kg bag of carrots",
        categoryId: category._id,
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((payment) => {
          should.not.exist(payment, "The payment should have been invalid");
        }); 
    });

    it("should require an amount to be a positive number", async() => {
      await Payment.create({
        title: "Carrots",
        description: "A 1kg bag of carrots",
        amount: -19,
        categoryId: category._id,
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((payment) => {
          should.not.exist(payment, "The payment should have been invalid");
        }); 
    });

    it("should require a category", async() => {
      await Payment.create({
        title: "Carrots",
        description: "A 1kg bag of carrots",
        amount: 2,
        userId: user._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((payment) => {
          should.not.exist(payment, "The payment should have been invalid");
        }); 
    });

    it("should require a user", async() => {
      await Payment.create({
        title: "Carrots",
        description: "A 1kg bag of carrots",
        amount: 2,
        categoryId: category._id
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((payment) => {
          should.not.exist(payment, "The payment should have been invalid");
        }); 
    });
  });

  // TEST ROUTING & CONTROLLERS

  describe("API tests", () => {
    let user;
    let category;
    let payment;
    let authToken;

    let otherUser;
    let otherCategory;
    let otherPayment;

    /**
     * Creates a payment object without saving it into the databse
     * @returns Payment object
     */
    const genPayment = async() => {
      user = await User.findOne({name: "Jill"});
      category = await Category.findOne({name: "Groceries"});
      return {
        title: "Carrots",
        description: "A 1kg bag of carrots",
        amount: 2,
        categoryId: category._id,
        userId: user._id
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
        name: "PC components"
      };

      await User.create({...USER}).then(async(user) => {
        await Category.create({...CATEGORY, userId: user._id});
      });
    });

    beforeEach(async() => {
      //flush payments
      await Payment.deleteMany({});

      //get users and categories
      user = await User.findOne({name: "Jill"});
      category = await Category.findOne({name: "Groceries"});
      otherUser = await User.findOne({name: "John"});
      otherCategory = await Category.findOne({name: "PC components"});
      authToken = generateToken(user);

      // payment belonging to the other user
      const OTHER_PAYMENT = {
        title: "7950X3D",
        description: "CPU for homework",
        amount: 699
      };
      otherPayment = await Payment.create({...OTHER_PAYMENT, userId: otherUser._id, categoryId: otherCategory._id});

      // add a payment to the user
      const PAYMENT = {
        title: "Potatoes",
        description: "A bag of potatoes",
        amount: 2.5
      };
      payment = await Payment.create({...PAYMENT, userId: user._id, categoryId: category._id});
    });

    it("should require a logged in user", async() => {
      const res = await chai.request(app)
        .get("/api/payment/");
      assertError(res, 401);
    });

    it("should get payments belonging to the user", async() => {
      const res = await chai.request(app)
        .get("/api/payment/")
        .set("Authorization", ("Bearer " + authToken));
        
      res.should.have.status(200);
      res.should.have.property("body");
      should.exist(res.body, "Should have gotten an array of payments");
      res.body.length.should.equal(1, "Should have only received one payment");
      res.body[0].should.have.property("title", payment.title);
      res.body[0].should.have.property("description", payment.description);
      res.body[0].should.have.property("amount", payment.amount);
    });

    it("should not allow the user to create a payment in a category they do not own", async() => {
      const initPayments = await Payment.countDocuments();
      let payment = await genPayment();
      payment.categoryId = otherCategory._id;

      const res = await chai.request(app)
        .post("/api/payment/")
        .send(payment)
        .set("Authorization", ("Bearer " + authToken));

      const payments = await Payment.countDocuments();
      assertError(res, 403);
      payments.should.be.equal(initPayments); 
    });

    it("should not allow the user to create a payment with a category that does not exist", async() => {
      const initPayments = await Payment.countDocuments();
      let payment = await genPayment();
      payment.categoryId = "641c50aefbe4e1e266666666";

      const res = await chai.request(app)
        .post("/api/payment/")
        .send(payment)
        .set("Authorization", ("Bearer " + authToken));

      const payments = await Payment.countDocuments();
      assertError(res, 404);
      payments.should.be.equal(initPayments); 
    });

    it("should get a summary of payments", async() => {
      const today = new Date();

      await Payment.create({ // today
        title: "Carrots",
        description: "A 1kg bag of carrots",
        amount: 10,
        categoryId: category._id,
        userId: user._id
      });

      await Payment.create({ // within last week
        title: "Carrots",
        description: "A 1kg bag of carrots",
        amount: 10,
        date: new Date(today.getFullYear(), today.getMonth(), Math.max(1, today.getDate() - 6)), // within week not before
        categoryId: category._id,
        userId: user._id
      });

      await Payment.create({ // within last month
        title: "Carrots",
        description: "A 1kg bag of carrots",
        amount: 10,
        date: new Date(today.getFullYear(), today.getMonth(), Math.max(1, today.getDate() - 8)),
        categoryId: category._id,
        userId: user._id
      });

      await Payment.create({ // within last year
        title: "Carrots",
        description: "A 1kg bag of carrots",
        amount: 10,
        date: new Date(today.getFullYear(), Math.max(1, today.getMonth() - 1), today.getDate()),
        categoryId: category._id,
        userId: user._id
      });

      const res = await chai.request(app)
        .get("/api/payment/summary/?days=500")
        .set("Authorization", ("Bearer " + authToken));

      should.exist(res.body);
      res.should.have.status(200);
      res.body.should.have.property("day", 12.5);
      res.body.should.have.property("week", 22.5);
      res.body.should.have.property("month", 32.5);
      res.body.should.have.property("year", 42.5);
      res.body.should.have.property("custom", 42.5);
    });

    it("should post a valid payment", async() => {
      const initPayments = await Payment.countDocuments();
      const res = await chai.request(app)
        .post("/api/payment/")
        .send(await genPayment())
        .set("Authorization", ("Bearer " + authToken));

      const payments = await Payment.countDocuments();
      payments.should.be.equal(initPayments + 1); 
      res.should.have.status(201);
      res.should.have.property("body");
      res.body.should.have.property("title", "Carrots");
      res.body.should.have.property("description", "A 1kg bag of carrots");
      res.body.should.have.property("amount", 2);
    });


    it("should get a specific payment", async() => {
      const res = await chai.request(app)
        .get("/api/payment/" + payment._id)
        .set("Authorization", ("Bearer " + authToken));

      res.should.have.status(200);
      res.should.have.property("body");
      should.exist(res.body, "Should have gotten a payment");
      res.body.should.have.property("title", payment.title);
      res.body.should.have.property("description", payment.description);
      res.body.should.have.property("amount", payment.amount);
    });

    it("should not get a payment that does not exist", async() => {
      const res = await chai.request(app)
        .get("/api/payment/" + "111111111111111111111111") // test with invalid id
        .set("Authorization", ("Bearer " + authToken));

      assertError(res, 404);
    });

    it("should prevent the user from getting a payment of a different user", async() => {
      const res = await chai.request(app)
        .get("/api/payment/" + otherPayment._id)
        .set("Authorization", ("Bearer " + authToken));

      assertError(res, 403);
    });

    it("should delete a specified payment", async() => {
      const initPayments = await Payment.countDocuments();
      const res = await chai.request(app)
        .delete("/api/payment/" + payment._id)
        .set("Authorization", ("Bearer " + authToken));
      res.should.have.status(200);

      const payments = await Payment.countDocuments();
      payments.should.be.equal(initPayments - 1); 
      const resPost = await chai.request(app)
        .get("/api/payment/" + payment._id)
        .set("Authorization", ("Bearer " + authToken));
      assertError(resPost, 404);
    });

    it("should not delete a payment that does not exist", async() => {
      const initPayments = await Payment.countDocuments();
      const res = await chai.request(app)
        .get("/api/payment/" + "111111111111111111111111") // test with invalid id
        .set("Authorization", ("Bearer " + authToken));

      const payments = await Payment.countDocuments();
      payments.should.be.equal(initPayments); 
      assertError(res, 404);
    });

    it("should prevent the user from deleting another user's payment", async() => {
      const initPayments = await Payment.countDocuments();
      const res = await chai.request(app)
        .delete("/api/payment/" + otherPayment._id)
        .set("Authorization", ("Bearer " + authToken));
      assertError(res, 403);

      // other payment should still exist
      const resPost = await chai.request(app)
        .get("/api/payment/" + otherPayment._id)
        .set("Authorization", ("Bearer " + generateToken(otherUser)));

      const payments = await Payment.countDocuments();
      payments.should.be.equal(initPayments);
      resPost.should.have.status(200);
      resPost.should.have.property("body");
      should.exist(resPost.body, "Should have gotten a payment");
      resPost.body.should.have.property("title", otherPayment.title);
      resPost.body.should.have.property("description", otherPayment.description);
      resPost.body.should.have.property("amount", otherPayment.amount);
    });

    it("should update a specified payment", async() => {
      const res = await chai.request(app)
        .patch("/api/payment/" + payment._id)
        .send(await genPayment())
        .set("Authorization", ("Bearer " + authToken));

      // should return payment before updating
      res.should.have.status(200);
      res.should.have.property("body");
      res.body.should.have.property("title", payment.title);
      res.body.should.have.property("description", payment.description);
      res.body.should.have.property("amount", payment.amount);

      // should return newly updated payment
      const resPost = await chai.request(app)
        .get("/api/payment/" + payment._id)
        .set("Authorization", ("Bearer " + authToken));

      resPost.should.have.status(200);
      resPost.should.have.property("body");
      resPost.body.should.have.property("title", "Carrots");
      resPost.body.should.have.property("description", "A 1kg bag of carrots");
      resPost.body.should.have.property("amount", 2);
    });

    it("should not update a payment that does not exist", async() => {
      const res = await chai.request(app)
        .get("/api/payment/" + "111111111111111111111111") // test with invalid id
        .set("Authorization", ("Bearer " + authToken));

      assertError(res, 404);
    });

    it("should prevent the user from modifying another user's payment", async() => {
      const res = await chai.request(app)
        .patch("/api/payment/" + otherPayment._id)
        .send(await genPayment())
        .set("Authorization", ("Bearer " + authToken));
      assertError(res, 403);

      // should not have modified the other user's payment
      const resPost = await chai.request(app)
        .get("/api/payment/" + otherPayment._id)
        .set("Authorization", ("Bearer " + generateToken(otherUser)));

      resPost.should.have.status(200);
      resPost.should.have.property("body");
      should.exist(resPost.body, "Should have gotten a payment");
      resPost.body.should.have.property("title", otherPayment.title);
      resPost.body.should.have.property("description", otherPayment.description);
      resPost.body.should.have.property("amount", otherPayment.amount);
    });
  });
});