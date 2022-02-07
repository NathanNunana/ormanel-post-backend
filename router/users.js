const express = require("express");
const router = express.Router();
const asyncWrapper = require("../middlewares/async_wrapper");
const authenticateToken = require("../middlewares/jwt_auth");
const { login, register, logout, homeRoute } = require("../controllers/users");

router.route("/").get(authenticateToken, homeRoute);

router.route("/login").post(asyncWrapper(login));
router.route("/register").post(asyncWrapper(register));
router.route("logout").get(asyncWrapper(logout));

module.exports = router;
