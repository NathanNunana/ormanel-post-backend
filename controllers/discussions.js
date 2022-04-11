function sendMessage(req, res) {
  console.log("send messages");
  const name = req.query.name;
  const chatRoom = req.query.chatroom;
  io.on("connection", (socket) => {
    console.log(`user joined ${chatRoom} chatroom`);
    socket.broadcast.emit("bot", `${name} joined the discussion board`);
    socket.on("message", (message) => {
      io.emit("message", message);
      console.log(message);
    });
    socket.on("disconnect", () => {
      console.log("user is disconnected");
      io.emit("message", "user disconnected");
    });
  });
}

function allDiscussions(req, res) {
  res.render("home");
}

module.exports = {
  sendMessage,
  allDiscussions,
};
