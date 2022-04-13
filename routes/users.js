const express = require("express");
const router = express.Router();
const asyncWrapper = require("../middlewares/async_wrapper");
const authenticateToken = require("../middlewares/jwt_auth");
const { login, register, logout, homeRoute } = require("../controllers/users");

/**
 * @openapi
 * '/user':
 *  get:
 *    tags: 
 *      - User
 *    description: creating and posting a new blog
 *    response: 
 *      200:
 *        description: blog created successfully
 */
router.route("/").get(authenticateToken, homeRoute);

/**
 * @openapi
 * '/user/login':
 *  post:
 *    description: creating and posting a new blog
 *    response: 
 *      200:
 *        description: blog created successfully
 */
router.route("/login").post(asyncWrapper(login));

/**
 * @openapi
 * '/user/register':
 *  post:
 *    description: creating and posting a new blog
 *    response: 
 *      200:
 *        description: blog created successfully
 */
router.route("/register").post(asyncWrapper(register));

/**
 * @openapi
 * '/user/logout':
 *  get:
 *    tags: 
 *      - all posts
 *    description: creating and posting a new blog
 *    response: 
 *      200:
 *        description: blog created successfully
 */
router.route("/logout").get(asyncWrapper(logout));

module.exports = router;
