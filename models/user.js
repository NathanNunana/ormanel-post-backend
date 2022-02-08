const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
  async create(users) {
    //   Encrypt user password
    const hashedPassword = await bcrypt.hash(this.password, 10);
    const query = {
      name: this.name,
      email: this.email.toLowerCase(),
      password: hashedPassword,
    };
    await users.insertOne(query);
    console.log("user createed!");
  }
  static async login(email, password, users) {
    const user = await users.findOne({ email: email });
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = {
        id: user._id,
        username: user.name
      }
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
      return accessToken
    }else{
      return null;
    }
  }
};
