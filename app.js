const express = require("express");
const bodyParser = require("body-parser");
const postRoute = require("./router/posts");
const authRoute = require("./router/users");
const connectDB = require("./db/connect");
const app = express();

require("dotenv").config();

// middlewares
app.use(bodyParser.json());

// external routes
app.use("/", postRoute);
app.use("/user", authRoute);

// connection url
const uri = process.env.DB_CONN;

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    // db connection
    const db = await connectDB(uri);

    // collections
    const posts = db.collection("posts");
    const users = db.collection("users");

    app.use((req, res, next) => {
      req.posts = posts;
      req.users = users;
      next();
    });

    // listening on port 3000
    await app.listen(port);
    console.log(`server started on port ${port}!`);
  } catch (error) {
    console.error;
  }
}
startServer();
