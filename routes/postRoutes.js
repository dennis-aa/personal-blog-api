const express = require("express");
const postController = require("./../controllers/postController");
const router = express.Router();

router.route("/").get(postController.getAllPosts);

router.route("/:id").get(postController.getAPost);

module.exports = router;
