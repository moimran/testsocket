var path = require("path");
var fs = require("fs");
var nodeRoot = path.dirname(require.main.filename);
var configPath = path.join(nodeRoot, "config.json");
var publicPath = path.join(nodeRoot, "client");
console.log("WebSSH2 service reading config from: " + configPath);
var express = require("express");
var logger = require("morgan");

// sane defaults if config.json or parts are missing
let config = {
  listen: {
    ip: "0.0.0.0",
    port: 3000,
  },
  user: {
    name: null,
    password: null,
    privatekey: null,
  },
  ssh: {
    host: null,
    port: 22,
    term: "xterm-color",
    readyTimeout: 20000,
    keepaliveInterval: 120000,
    keepaliveCountMax: 10,
    allowedSubnets: [],
  },
  terminal: {
    cursorBlink: true,
    scrollback: 10000,
    tabStopWidth: 8,
    bellStyle: "sound",
  },
  header: {
    text: null,
    background: "green",
  },
  session: {
    name: "WebSSH2",
    secret: "mysecret",
  },
  options: {
    challengeButton: true,
    allowreauth: true,
  },
  algorithms: {
    kex: [
      "ecdh-sha2-nistp256",
      "ecdh-sha2-nistp384",
      "ecdh-sha2-nistp521",
      "diffie-hellman-group-exchange-sha256",
      "diffie-hellman-group14-sha1",
    ],
    cipher: [
      "aes128-ctr",
      "aes192-ctr",
      "aes256-ctr",
      "aes128-gcm",
      "aes128-gcm@openssh.com",
      "aes256-gcm",
      "aes256-gcm@openssh.com",
      "aes256-cbc",
    ],
    hmac: ["hmac-sha2-256", "hmac-sha2-512", "hmac-sha1"],
    compress: ["none", "zlib@openssh.com", "zlib"],
  },
  serverlog: {
    client: false,
    server: false,
  },
  accesslog: false,
  verify: false,
  safeShutdownDuration: 300,
};


var app = express();
var server = require("http").Server(app);
var validator = require("validator");
const options = {
  /* ... */
};
var io = require("socket.io")(server, options);

io.on("connection", (socket) => {
  console.log("new connection");
    console.log(socket.handshake.headers.host);
    socket.emit('message-from-server', {
        greeting: 'Hello from server.'
    });

    socket.on('message-from-client', (msg) => {
        console.log(msg);
    });
});

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(path.join(publicPath, "index.html")));
})

module.exports = { server: server, config: config };