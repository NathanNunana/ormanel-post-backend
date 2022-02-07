const express = require("express");
const router = express.Router();
const asyncWrapper = require("../middlewares/async_wrapper");

const {
  savePost,
  loadPost,
  removePost,
  updatePost,
} = require("../controllers/posts");

router.route("/post").post(asyncWrapper(savePost));

router.route("/allposts").get(asyncWrapper(loadPost));

router.route("/posts/remove/:id").delete(asyncWrapper(removePost));

router.route("/posts/update/:id").patch(asyncWrapper(updatePost));

module.exports = router;