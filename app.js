const express = require("express");
const bodyParser = require("body-parser");
const postRoute = require("./router/posts");
const authRoute = require("./router/users");
const { MongoClient } = require("mongodb");
const app = express();

require("dotenv").config();

// connection url
const uri = process.env.DB_CONN;

const port = process.env.PORT || 3000;

async function startServer() {
  // db connection
  const client = await MongoClient.connect(uri);
  const db = await client.db("interviewdb");

  // collections
  const posts = db.collection("posts");
  const users = db.collection("users");

  // body-parser
  app.use(bodyParser.json());

  // Accessing collections through all node modules
  app.use((req, res, next) => {
    req.posts = posts;
    req.users = users;
    next();
  });

  // external routes
  app.use("/", postRoute);
  app.use("/user", authRoute);

  // listening on port 3000
  await app.listen(port);
  console.log(`server started on port ${port}!`);
}
startServer();
