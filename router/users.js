const express = require("express");
const router = express.Router();
const asyncWrapper = require("../middlewares/async_wrapper");
const authenticateToken = require("../middlewares/jwt_auth");
const { login, register, logout } = require("../controllers/users");

router.get("/", authenticateToken, (req, res) => {
  res.json(req.user);
});

router.route("/login").post(asyncWrapper(login));
router.route("/register").post(asyncWrapper(register));
router.route("logout").get(asyncWrapper(logout));

module.exports = router;
