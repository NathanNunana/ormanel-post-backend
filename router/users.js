const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/jwt-auth");
const { login, register, logout } = require("../controllers/users");

router.get("/", authenticateToken, (req, res) => {
  res.json(req.user);
})

router.post("/login", login);

router.post("/register", register);

router.get("logout", logout);

module.exports = router;