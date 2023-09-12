//Initial version of your api

//Imports
const express = require("express");
const fs = require("fs");

//Initialize Express
const app = express();

//Setup Middleware and import data from JSON

app.use(express.json());

const posts = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/posts.json`));

//Setup callback functions

const getAllPosts = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
};

const getAPost = (req, res) => {
  const id = req.params.id * 1; //Remember a quick way to make a stirng a number
  const post = posts.find((element) => element.id === id);
  res.status(200).json({
    status: "success",
    post: post,
  });
};

//Setup routes
app.route("/api/v1/posts").get(getAllPosts);
app.route("/api/v1/posts/:id").get(getAPost);

//Setup port to listen on
const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
