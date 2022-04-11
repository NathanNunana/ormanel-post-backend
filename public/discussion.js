var socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const message = document.getElementById("message-board");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("message", input.value);
    input.value = "";
  }
});

socket.on("message", function (msg) {
  const li = document.createElement("li");
  li.textContent = `${msg}`;
  message.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
});
