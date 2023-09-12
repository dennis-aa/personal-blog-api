const fs = require("fs");

const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/posts.json`)
);

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
