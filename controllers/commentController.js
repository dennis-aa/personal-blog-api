const Comment = require("../models/commentModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllComments = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.postId) filter = { post: req.params.postId };

  const comments = await Comment.find(filter);

  res.status(200).json({
    status: "success",
    results: comments.length,
    data: {
      comments,
    },
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  //Nested Routes
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user.id;
  const newComment = await Comment.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      comments: newComment,
    },
  });
});
