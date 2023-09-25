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

//Adding a field to our request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Setup routes
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
