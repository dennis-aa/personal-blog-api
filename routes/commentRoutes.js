const express = require("express");
const commentController = require("./../controllers/commentController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(commentController.getAllComments)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    commentController.createComment
  );

module.exports = router;
