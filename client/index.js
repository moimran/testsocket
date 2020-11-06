// const socket = require("socket.io-client")("http://localhost:3000");

const socket = io();
socket.on("data", function (data) {
  console.log(data);
});

socket.on("connect", function () {
  console.log("host connected");
});



socket.on("message-from-server", (msg) => {
    document.body.appendChild(document.createTextNode(msg.greeting));
    socket.emit("message-from-client", {
      greeting: "Hello from client.",
    });
});
