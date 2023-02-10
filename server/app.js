const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT;
const env = process.env.NODE_ENV || "normal";
let dbURI;

if (env === "test")
  dbURI = process.env.TEST_DB_URI;
else
  dbURI = process.env.DB_URI;

const corsOptions = {
  origin: process.env.CORS_ORIGIN
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", require("./routes/userRoutes"));

app.use("/api/category", require("./routes/categoryRoutes"));

app.get("/", (req, res, next) => {
  console.log(req.path,req.method);
  next();
});

mongoose.connect(dbURI)
  .then(() => {
    app.listen(port, () => {
      console.log(`DB connection successful, listening on port ${port}`);
    });
  })
  .then((error) => {
    console.log(error);
  });

module.exports = app;