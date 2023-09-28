//Initial version of your api

//Imports
const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
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
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
