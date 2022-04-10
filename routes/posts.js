const express = require("express");
const router = express.Router();
const asyncWrapper = require("../middlewares/async_wrapper");
const {
  savePost,
  loadPost,
  removePost,
  updatePost,
} = require("../controllers/posts");

/**
 * @openapi
 * /post:
 *  post:
 *    tag:
 *      - Post
 *      description: creating and posting a new blog
 *      response: 
 *        200:
 *          description: blog created successfully
 */
router.route("/post").post(asyncWrapper(savePost));
router.route("/allposts").get(asyncWrapper(loadPost));
router.route("/posts/remove/:id").delete(asyncWrapper(removePost));
router.route("/posts/update/:id").patch(asyncWrapper(updatePost));

module.exports = router;