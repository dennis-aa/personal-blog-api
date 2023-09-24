const mongoose = require("mongoose");
const currDate = new Date();
currDate.toISOString;
//Setup Schema for posts
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A post must have a title"],
  },
  datePosted: {
    type: String,
    default: currDate,
    //select: false <-- A way to hide fields from client
  },
  post: {
    type: String,
    required: [true, "A post must have an actual post!"],
  },
  tags: [
    {
      type: String,
    },
  ],
});

//Setup model for post
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
