const Post = require("./../models/postModel");

exports.getAllPosts = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      posts,
    },
  });
};

exports.getAPost = (req, res) => {
  const id = req.params.id * 1; //Remember a quick way to make a stirng a number
  const post = posts.find((element) => element.id === id);
  res.status(200).json({
    status: "success",
    post: post,
  });
};

exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
