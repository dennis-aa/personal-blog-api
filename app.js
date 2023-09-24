//Initial version of your api

//Imports
const express = require("express");
const morgan = require("morgan");

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

//Initialize Express
const app = express();

//Using third-party Middleware
app.use(morgan("dev"));

//Setup Middleware

app.use(express.json());

//Adding our own Middleware for examples sake

app.use((req, res, next) => {
  console.log("Bienvendios to our Middleware!");
  next();
});

//Adding a field to our request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Setup routes
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
