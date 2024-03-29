const express = require("express");
const socket = require("socket.io");
const fs = require("fs");

/* App setup */
const PORT = process.env.PORT || 80;
const app = express();
const index = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
const dataFile = "data.json";

app.use(express.static("public")); /* Host html & js filed generated by vite */
app.use(express.json()); /* For POST/PUT request */

/* GET /info: read and send data of data.json */
app.get("/info", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFile, "utf8"));
  res.send(data);
});

/* PUT /info: update data of data.json */
app.put("/info", (req, res) => {
  let data = JSON.stringify({ contents: req.body.contents });
  fs.writeFileSync(dataFile, data);
  res.sendStatus(200);
});

/* Prevent 404 error when user typed URL in browser directory */
app.use("/*", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

/* Socket setup */
const io = socket(index, {
  pingTimeout: 4000,
  pingInterval: 4000,
});

/* we use a set to store users, sets objects are for unique values of any type */
const activeUsers = new Set();
const typingUsers = new Set();

io.on("connection", function (socket) {
  socket.on("user connected", function (data) {
    socket.userName = data;
    activeUsers.add(socket.userName);
    io.emit("new user connected", Array.from(activeUsers));
  });

  socket.on("chat message", function (data) {
    io.emit("chat message", data);
  });

  socket.on("start typing", function () {
    typingUsers.add(socket.userName);
    io.emit("typing", Array.from(typingUsers));
  });

  socket.on("stop typing", function () {
    typingUsers.delete(socket.userName);
    io.emit("typing", Array.from(typingUsers));
  });

  socket.on("disconnect", function () {
    activeUsers.delete(socket.userName);
    typingUsers.delete(socket.userName);
    io.emit("user disconnected", socket.userName);
    io.emit("typing", typingUsers);
  });

  socket.on("user disconnect", function () {
    activeUsers.delete(socket.userName);
    typingUsers.delete(socket.userName);
    io.emit("user disconnected", socket.userName);
    io.emit("typing", typingUsers);
  });
});
