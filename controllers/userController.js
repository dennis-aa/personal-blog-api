const AppError = require("../utils/appError");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

const filterObj = (obj, ...filteredFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (filteredFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
//Place holders for when we actually add users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  //SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.udpateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    next(
      new AppError("Please use /updateMyPassword for password updates ", 400)
    );
  }

  const filteredBody = filterObj(req.body, "name", "email");
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};
