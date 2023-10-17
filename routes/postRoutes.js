const express = require("express");
const postController = require("./../controllers/postController");
const authController = require("./../controllers/authController");
const commentRouter = require("./../routes/commentRoutes");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, postController.getAllPosts)
  .post(postController.createPost);

router
  .route("/:id")
  .get(postController.getAPost)
  .patch(postController.updatePost)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    postController.deletePost
  );
router.use("/:postId/comments", commentRouter);

module.exports = router;
