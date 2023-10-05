//Initial version of your api

//Imports
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const commentRouter = require("./routes/commentRoutes");

//Initialize Express
const app = express();

//GLOBAL MIDDLEWARES
//Setting security HTTP Headers
app.use(helmet());

//Dev logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Apply limit to requests from API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});
app.use("/api", limiter);

//Parse body into request
app.use(
  express.json({
    limit: "10kb",
  })
);

//Data sanatization
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: ["tags"],
  })
);

//For testing purposes
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Setup routes
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/comments", commentRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
