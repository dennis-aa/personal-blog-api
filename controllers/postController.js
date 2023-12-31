const AppError = require("../utils/appError");
const Post = require("./../models/postModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
exports.getAllPosts = catchAsync(async (req, res, next) => {
  //EXECUTE QUERY
  const features = new APIFeatures(Post.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const posts = await features.query;

  //SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: posts.length,
    data: {
      posts,
    },
  });
});

exports.getAPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("comments");

  if (!post) {
    return next(new AppError(`No post found with that ID`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      post: newPost,
    },
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //Returns updated post
    runValidators: true,
  });

  if (!post) {
    return next(new AppError(`No post found with that ID`, 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      post: updatedPost,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(new AppError(`No post found with that ID`, 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
