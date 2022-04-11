const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const { Server } = require("socket.io");

const postRoute = require("./routes/posts");
const authRoute = require("./routes/users");
const discussionRoute = require("./routes/discussions");
const swaggerDocs = require("./utils/swagger");
const connectDB = require("./db/connect");
const getCollections = require("./middlewares/collections");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
require("dotenv").config();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(bodyParser.json());
app.use(express.static("public"));
app.use((req, res, next) => {req.io = io; next()});

const port = process.env.PORT || 3000;

// starting swaggerDocs
swaggerDocs(app);

async function startServer() {
  try {
    // db connection
    const db = await connectDB(process.env.CONN_DB);
    // db collections
    app.use(getCollections(db));
    // external routes
    app.use("/", postRoute);
    app.use("/user", authRoute);
    app.use("/discussions", discussionRoute);
    // listening on port 3000
    server.listen(port, () => {
      console.log(`server started on port ${port}!`);
    });
  } catch (error) {
    console.log(error);
  }
}
startServer();
