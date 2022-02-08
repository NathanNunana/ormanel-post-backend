const User = require("../models/user");

async function login(req, res) {
  const { email, password } = req.body;
  const response = await User.login(email, password, req.users);
  if(response){
    return res.status(200).json({ token: response });
  }
  res.status(409).json({msg: "incorrect email or password!"})
}

async function register(req, res) {
  const { name, email, password } = req.body;
  const userExists = await req.users.findOne({ email: email });
  if (!userExists) {
    const user = new User(name, email, password);
    await user.create(req.users);
    return res.status(200).json({ success: true });
  }
  // else{
  res.status(409).json({msg:"user with email already exists"})
  // }
}

function homeRoute(req, res) {
  res.json(req.user);
}

async function logout(req, res) {}

module.exports = {
  login,
  register,
  logout,
  homeRoute,
};
