const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const postRoute = require("./routes/posts");
const authRoute = require("./routes/users");
const swaggerDocs = require("./utils/swagger");
const connectDB = require("./db/connect");
const app = express();

const server = http.createServer(app);
require("dotenv").config();

// middlewares
app.use(bodyParser.json());
app.use(express.static("public"));

// server port
const port = process.env.PORT || 3000;

async function startServer() {
  try {
    // db connection
    const db = await connectDB(process.env.CONN_DB);

    // collections
    const posts = db.collection("posts");
    const users = db.collection("users");
    app.use((req, res, next) => {
      req.posts = posts;
      req.users = users;
      next();
    });

    // external routes
    app.use("/", postRoute);
    app.use("/user", authRoute);

    // starting swaggerDocs
    swaggerDocs(app);

    // listening on port 3000
    server.listen(port, () => {
      console.log(`server started on port ${port}!`);
    });
  } catch (error) {
    console.error;
  }
}
startServer();
