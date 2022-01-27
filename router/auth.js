const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

// route methods
async function login(req, res) {
  const { email, password } = req.body;
  const response = await User.login(email, password, req.users);
  res.json({token: response})
}

async function register(req, res) {
  // getting the details of registration from the user
  const { name, email, password, password2 } = req.body;

  // fetching an existing user based on email address
  const userExists = await req.users.findOne({ email: email });

  console.log(`${userExists} exists`);

  // checking for existing users
  if (!userExists) {
    // creating a new User
    const user =
      password === password2
        ? new User(name, email, password)
        : res.json({ msg: "password mismatch!" });

    // saving the new user to the collection
    await user.create(req.users);
    res.status(200).json({ success: true });
    
    console.log(`Here: ${user}`);
  } else {
    res.status(409).json({ msg: "user already exists" });
  }
  //   console.log(user);
}

// user authentication route
router.post("/login", login);

router.post("/register", register);

// logout
async function logout(req, res) {}

router.get("logout", logout);

module.exports = router;
