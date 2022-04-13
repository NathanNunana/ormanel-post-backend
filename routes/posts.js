const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/jwt_auth");
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
 *    tags: 
 *      - post
 *  summary: save a post
 *  requestBody: 
 *    required: true
 *    content: 
 *      application/json
 *      schema
 */
router.route("/post").post(authenticateToken, asyncWrapper(savePost));

/**
 * @openapi
 * /allpost:
 *  get:
 *    tags: 
 *      - all posts
 *    description: creating and posting a new blog
 *    response: 
 *      200:
 *        description: blog created successfully
 */
router.route("/allposts").get(authenticateToken, asyncWrapper(loadPost));

/**
 * @openapi
 * '/posts/remove/:id':
 *  delete:
 *    tags: 
 *      - delete posts
 *    description: creating and posting a new blog
 *    response: 
 *      200:
 *        description: blog created successfully
 */
router.route("/posts/remove/:id").delete(authenticateToken ,asyncWrapper(removePost));

/**
 * @openapi
 * '/post/update/:id':
 *  patch:
 *    tags: 
 *      - update post
 *    description: creating and posting a new blog
 *    response: 
 *      200:
 *        description: blog created successfully
 */
router.route("/posts/update/:id").patch(authenticateToken ,asyncWrapper(updatePost));

module.exports = router;