const express = require("express");
const router = express.Router();
const asyncWrapper = require("../middlewares/async_wrapper");
const authenticateToken = require("../middlewares/jwt_auth");
const { allDiscussions, sendMessage } = require("../controllers/discussions");

router
  .route("/")

/**
 * @openapi
 * /discussions:
 *  get:
 *    tags: 
 *      - Discussions
 *    description: creating and posting a new blog
 *    response: 
 *      200:
 *        description: blog created successfully
 */
  .get(asyncWrapper(allDiscussions))

/**
 * @openapi
 * /discussions:
 *  post:
 *    description: creating and posting a new blog
 *    response: 
 *      200:
 *        description: blog created successfully
 */
  .post(asyncWrapper(sendMessage));

module.exports = router;
