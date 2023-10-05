//Initial version of your api

//Imports
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

//Initialize Express
const app = express();

//GLOBAL MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limiter);

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
