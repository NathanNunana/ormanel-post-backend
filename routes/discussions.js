const express = require("express");
const router = express.Router();
const asyncWrapper = require("../middlewares/async_wrapper");
const authenticateToken = require("../middlewares/jwt_auth");
const { allDiscussions, sendMessage } = require("../controllers/discussions");

router
  .route("/")
  .get(asyncWrapper(allDiscussions))
  .post(asyncWrapper(sendMessage));

module.exports = router;
