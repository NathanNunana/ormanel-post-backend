const express = require("express");
const bodyParser = require("body-parser");
const postRoute = require("./router/posts");
const authRoute = require("./router/users");
const connectDB = require("./db/connect");
const app = express();

require("dotenv").config();

// middlewares
app.use(bodyParser.json());

// server port
const port = process.env.PORT || 3000;

async function startServer() {
  try {
    // db connection
    const db = await connectDB(process.env.DB_CONN);
    console.log(db)
    // collections
    const posts = db.collection("posts");
    const users = db.collection("users");
    console.log(posts, users)

    app.use((req, res, next) => {
      req.posts = posts;
      req.users = users;
      next();
    });

    // // external routes
    app.use("/", postRoute);
    app.use("/user", authRoute);

    // listening on port 3000
    app.listen(port, ()=>{
      console.log(`server started on port ${port}!`);
    });
  } catch (error) {
    console.error;
  }
}
startServer();
