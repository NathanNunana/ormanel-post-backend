const User = require("../models/user");

async function login(req, res) {
  const { email, password } = req.body;
  const response = await User.login(email, password, req.users);
  res.json({ token: response });
}

async function register(req, res) {
  const { name, email, password } = req.body;
  const user = new User(name, email, password);
  await user.create(req.users);
  res.status(200).json({ success: true });
}

async function logout(req, res) {}

module.exports = {
    login, register, logout
}
