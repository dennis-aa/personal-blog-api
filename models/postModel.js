const mongoose = require("mongoose");
const currDate = new Date();
currDate.toISOString;
//Setup Schema for posts
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A post must have a title"],
    unique: true,
    trim: true,
    minlength: [5, "A title must have more than five characters"],
    maxlength: [40, "A title must have less than 40 characters"],
  },
  datePosted: {
    type: String,
    default: currDate,
    //select: false <-- A way to hide fields from client
  },
  post: {
    type: String,
    required: [true, "A post must have an actual post!"],
    minlength: [10, "A post must have a minumum of 10 characters"],
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
